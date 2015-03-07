
var crGrptitleState = false;
var crGrpcontentState = false;
var crGrpCityState = false;
//////////////////////////////////////////////////////////////////////////////
function createGroup(){
	var url = serviceURL + 'regisGroup.php';
	$("#crGrpSubmitBtn").addClass("ui-state-disabled");
	var cgname = $("#crGrpTitleInput").val();
	var cgcont = $("#crGrpContentInput").val();
	var cgcity = $("#crGrpCityInput").val();
	var cgd = moment().format('YYYY-MM-DD HH:mm:ss');
	console.log(cgd);
	loadingShow("#contentCreateGroup");
	if (validCreateGroup()) {
		$.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'jsonp',
			data: {
				crgrpname: cgname,
				crgrpcontent: cgcont,
				crgrpcity: cgcity,
				crgrpdate: cgd
			},
			crossDomain: true,
			timeout: 10000,
			success: function(res) {
				if (!jQuery.isEmptyObject(res)) {
					
					window.localStorage.userGroup = res.group_id;
					//globalGId = res.group_id;
					selectThisNewGroup();
					//window.localStorage.userId = res.user_id;
					//window.location.replace(some.html);
					//window.open("home.html", '_self');
					$("#crGrpTitleInput").text("");
					$("#crGrpContentInput").text("");
					$("#crGrpCityInput").text("");
					$("#spcrGrpName").text("");
					crGrptitleState = false;
					crGrpcontentState = false;
					crGrpCityState = false;
					
					validCreateGroup();
					
					checkGroup();
					//loadUserGroup();
				} else {
					navigator.notification.alert("การสร้างกลุ่มเกิดข้อผิดพลาด", function() {});
					
				}
				
				$("#crGrpSubmitBtn").removeClass("ui-state-disabled");
				loadingHide("#contentCreateGroup");
			},
			error: function(e) {
				console.log(e.message);
				navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				$("#crGrpSubmitBtn").removeClass("ui-state-disabled");
				loadingHide("#contentCreateGroup");
			},
			complete: function(e) {
				console.log("message");
			}
		});
	} else {
		navigator.notification.alert("กรุณากรอก ชื่อกลุ่มที่จะสร้าง");
		$("#crGrpSubmitBtn").removeClass("ui-state-disabled");
		loadingHide("#contentRegis");
	}
	return false;
	
	}
//////////////////////////////////////////////////////////////////////////////

function createGroupBindEvent() {
		
		$("#crGrpTitleInput").on('focusout', function() {
			if ($("#crGrpTitleInput").val()) {
				crGrptitleState = true;
				validCreateGroup();
				checkUsedGroup();
				
			} else {
				crGrptitleState = false;
				validCreateGroup();
			}
		}).on('keyup', function() {
			if ($("#crGrpTitleInput").val()) {
				crGrptitleState = true;
				validCreateGroup();
			} else {
				crGrptitleState = false;
				validCreateGroup();
			}
		});
	$("#crGrpContentInput").on('change', function() {
			if ($("#crGrpContentInput").val()) {
				crGrpcontentState = true;
				validCreateGroup();
			} else {
				crGrpcontentState = false;
				validCreateGroup();
			}
		});
	$("#crGrpCityInput").on('keyup', function() {
			if ($("#crGrpCityInput").val()) {
				crGrpCityState = true;
				validCreateGroup();
			} else {
				crGrpCityState = false;
				validCreateGroup();
			}
		});
		
		validCreateGroup();
		
		//getCurrentPosition();
		//$('#spTimeMini').text(d.format('[เวลา] h:mm:ss'));
		// มกราคม 18 2015, 8:47:51 หลังเที่ยงmoment(localStorage.userBdate, 'YYYY-MM-DD', 'th').format('LL')
	}

//////////////////////////////////////////////////////////////////////////////
function validCreateGroup() {
	if (crGrptitleState !== false&&crGrpcontentState !== false&&crGrpCityState !== false) {
		$("#crGrpSubmitBtn").removeClass("ui-state-disabled");
		return true;
	} else {
		$("#crGrpSubmitBtn").addClass("ui-state-disabled");
		return false;
	}
}

//////////////////////////////////////////////////////////////////////////////
function checkUsedGroup() {
	
	var cgname = $("#crGrpTitleInput").val();
	
	var url = serviceURL + 'checkUsedGroup.php';
	if (cgname !== '') {
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					groupname: cgname
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						crGrptitleState = false;
						validCreateGroup();
						$("#spcrGrpName").text(cgname + " ชื่อกลุ่มนี้มีผู้ใช้แล้ว").css("color", "red");
						
					} else {
						crGrptitleState = true;
						validCreateGroup();
						$("#spcrGrpName").text(cgname + " ชื่อกลุ่มนี้สามารถใช้ได้").css("color", "green");
					}
				},
				error: function(e) {
					console.log(e.message);
					crGrptitleState = false;
					validCreateGroup();
					navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				},
				complete: function(e) {
					console.log("message");
				}
			});
		
	} else {
		crGrptitleState = false;
		validCreateGroup();
		$("#spcrGrpName").text("กรุณากรอก ชื่อกลุ่มที่จะสร้าง").css("color", "red");
	}
	return false;
}

//////////////////////////////////////////////////////	
function selectThisNewGroup (){
	
	
	var Id = localStorage.userId;
	var tg = window.localStorage.userGroup;
	var url = serviceURL + 'updateUserProfile.php';
	
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					userid: Id, 
					usergroup: tg
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						window.localStorage.userGroup = tg;
						gid = tg;
						loadUserGroup();
						//loadGroupFeed();
						//window.history.back();//navigator.app.backHistory();
						navigator.notification.alert("เลือกกลุ่มเรียบร้อยแล้ว.");
						console.log(res);
					} else {
						$("#spGroupOne").text("มีบางอย่างผิดพลาด").css("color", "red");
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
	
	return false;			
			
	}