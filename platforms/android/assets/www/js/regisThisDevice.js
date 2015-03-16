    var pushNotification;
    var php_addRegist=serviceURL + 'addDeviceRegis.php';  // path ไฟล์ 
	var notifyCount = window.localStorage.getItem("notifyCount");
	var count;
    function regisThisDevice() {  //ฟังก์ชั่นทำงานเมื่อเครื่องพร้อม
        var data_did=device.uuid; // เก็บค่า uid 

        try{   // เรียกใช้งาน plugin push
            pushNotification = window.plugins.pushNotification;
            //9//$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
            
            if(device.platform == 'android' || device.platform == 'Android' ||
                    device.platform == 'amazon-fireos' ) {
                    pushNotification.register(successHandler, errorHandler, {  // ทำการลง register 
                        "senderID":"320077907247",    // เปลี่ยนเป็นค่า project name จาก phonegap ตอนที่ 9
                        "ecb":"onNotification"
                    });		// required!
            }
        }catch(err){  // กรณีเกิดข้อผิดพลาด
            txt="There was an error on this page.\n\n"; 
            txt+="Error description: " + err.message + "\n\n"; 
            alert(txt); 
        } 
    }

    // จัดการกับข้อ GCM notifications สำหรับ Android
    function onNotification(e) {
        // แสดงสถานะ ใช้งานจริง ตรงนี่ิตัดออกได้ 
        //28//$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
						var u = window.localStorage.userId;
						var grp = window.localStorage.userGroup;
        switch( e.event ){  // การทำงานกับเงื่อนไขเหตุการณ์ที่เกิดขึ้น
            case 'registered':  // มีมีการ registered
                if( e.regid.length > 0 ){  // มีค่า regid
                    // ข้อความแสดงสถานะการทำงาน ใช้งานจริง ตรงนี่ิตัดออกได้ 
                   //34// $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
					 console.log("REGISTERED -> REGID:" + e.regid);
                    // ทดสอบดูค่า regiid ใช้งานจริงปรับได้ตามต้องการ
                    //console.log("regID = " + e.regid);
                    
                    // ส่งค่า regid และ uid ไปบันทึกไว้บน server
                    $.post(php_addRegist,{

                        did:device.uuid, // คล้าย id เครื่องเรา
                        regid:e.regid,
						uid:u,
						grpid:grp,
                        datetime:moment().format('YYYY-MM-DD HH:mm:ss')
                    },function(data){
                        console.log(data);
						//alert(data); // ทำงานตามต้องการ ในที่นี้ทดสอบ ให้ alert ค่าที่ได้จากไฟล์ add_regist.php
                    });
                }
                break;
            case 'message':  // เมื่อได้รับข้อความ push
                // ถ้าเราเปิด app อยู่ หมายถึง กำลังใช้งาน app จะให้ทำอย่างไร
                if (e.foreground){
                    // ใสคำสั่งส่วนนี้ตามต้องการ  ในตัวอย่าง เขาจะบอกแค่สถานะว่า เป็นการแจ้งแบบ inline
                    //54//$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
					console.log("--INLINE NOTIFICATION--");
                    navigator.notification.beep(1);
                }else{ // กรณีอื่นๆ หรือก็คือ เมื่อมี push มา
                    
                    if(e.coldstart){ // แล้วเรากดที่ ข้อความ push ด้านบน
                        // ก็จะเข้ามาทำงานในส่วนนี้ กำหนดตามต้องการ
                        //60//$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
						console.log("--COLDSTART NOTIFICATION--");
                    }else{
                        // กรณีอื่นๆ เช่น ทำงานแบบ background
                        //63//$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						console.log("--BACKGROUND NOTIFICATION--");
                    }
                }

                // แสดงข้อความ e.payload.message คือค่าข้อความทีเราได้ เราสามารถส่งตัวแปร อื่นๆ ตามต้องการได้
                // ส่วนนี้ทำงานเม่อได้รับข้อความ push
                //69//$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
				//localStorage.notifyCount += 1;
				countNotify();
				console.log(notifyCount);
				console.log("MESSAGE -> MSG: " + e.payload.message+ e.payload.title);
				//$('#spNotify').text(notifyCount);
                break;
            case 'error':  // กรณี error
                //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
				console.log("ERROR -> MSG: " + e.msg);
                break;
            default:  // อื่นๆ 
                //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            	console.log("EVENT -> Unknown, an event was received and we do not know what it is");
			break;
        }
    }

    // ฟังก์ชั่นเมื่อ process สำเร็จ  
    function successHandler (result) {      
        // เวลาใช้งานจริง บรทดัต่อจากนี้สามารถตัดออกได้ หรือใช้กำหนดค่าอื่นตามต้องการได้
        //83//$("#app-status-ul").append('<li>success:'+ result +'</li>');
		console.log("success: " + result);
    }
// ฟังก์ชั่นเมื่อ process เกิดข้อผิดพลาด 
    function errorHandler (error) {
        // เวลาใช้งานจริง บรทดัต่อจากนี้สามารถตัดออกได้ หรือใช้กำหนดค่าอื่นตามต้องการได้
        //88//$("#app-status-ul").append('<li>error:'+ error +'</li>');
		console.log("error: " + error);
    }
function deleteThisDevice (){
	
	var data_did=device.uuid;
	var url = serviceURL + 'deleteDevice.php';
	console.log(data_did);
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					did:device.uuid
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						//window.localStorage.userRName = rn;
						//loadThisUserReport();
						//getEditUserDetail();
						//$("#pMsgEditReport").text("แก้ไขข้อมูล เรียบร้อยแล้ว").css("color", "green").fadeOut(2000, function(){window.history.back();});
						console.log("ลบข้อมูล เรียบร้อยแล้ว");
						console.log(res);
					} else {
						navigator.notification.alert("มีบางอย่างผิดพลาด");
						console.log(res.success);
					}
				},
				error: function(e) {
					console.log(e.message);
					navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				},
				complete: function(e) {
					console.log("complete");
					
				}
			});

	}
    // ให้ไปทำงานฟังก์ชัน onDeviceReady เมือ cordova โหลดเรียบร้อยแล้ว
   //92// document.addEventListener('deviceready', onDeviceReady, true);
 
 //6 แสดงข้อความถึง event ที่เกิดขึ้น  ส่วนนี้ ใช้งานจริง สามารถลบออกได้
        //$("#app-status-ul").append('<li>deviceready event received</li>');
        //$("#app-status-ul").append('<li>UID'+data_uid+'</li>');  // แสดงค่า uid

        //10 ส่วนนี้ไม่เกี่ยวโดยตรงสักเท่าไหร่ แต่ประยุกต์ได้ เป็น event เมื่อกดปุ่ม back ที่เครื่อง
        /*document.addEventListener("backbutton", function(e){
            $("#app-status-ul").append('<li>backbutton event received</li>');
            // ถ้าหน้านี้มี div id เท่ากับ home แล้วถ้ากดปุ่ม back ให้ทำอะไร
            if( $("#home").length > 0){
                // ใน commnet ด้านล่าง เขาแนะนำว่า เราอาจจะยกเลือกการ register เมื่อ
                // เกิดขึ้นในกรณีตามกล่าวข้างต้น
                // call this to get a new token each time. don't call it to reuse existing token.
                //pushNotification.unregister(successHandler, errorHandler);
                e.preventDefault();
                navigator.app.exitApp(); //ปิด app ถ้าอยู่หน้า home
            }else{
                navigator.app.backHistory();  // ย้อนกลับแบบปกติ ถ้าอยู่หน้าอื่น
            }
        }, false);*/