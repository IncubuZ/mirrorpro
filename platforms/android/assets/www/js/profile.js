var globalProfileImageURI;
var editState = false;
function getUserDetail (){
		var d = moment();
		var gd = "";
		if(localStorage.userGender === "male"){
				gd = "ชาย";
				}else if(localStorage.userGender === "female"){
					gd = "หญิง";}else{
						gd = "อื่นๆ";}
		loadingShow("#contentProfile");
		$('#imgPropic').attr('src', serviceURL + "../img/userprofileimage/" + localStorage.userImageUrl +"?"+d.format());
		$('#spNamePro').text(localStorage.userRName + ' ' + localStorage.userSurname);
	
		$('#spGenderPro').text(gd);
		$('#spBirthPro').text(moment(localStorage.userBdate, 'YYYY-MM-DD', 'th').format('LL'));
		$('#spEmailPro').text(localStorage.userEmail);
		console.log(gd);
		console.log(localStorage.userBdate);
		loadingHide("#contentProfile");
}
//////////////////////////////////////////////////////

function getEditUserDetail (){
		clearCache();
		var d = moment();
		//loadingShow("#contentEditProfile");
		$('#imgEditPropic').attr('src', serviceURL + "../img/userprofileimage/" + localStorage.userImageUrl+"?"+d.format());
		$('#nameEditInput').val(localStorage.userRName);
		$('#surnameEditInput').val(localStorage.userSurname);
		var gen = $('#genderEditSelect');
		gen.val(localStorage.userGender).attr('selected', true).siblings('option').removeAttr('selected');
		gen.selectmenu().selectmenu('refresh', true);
		
		$('#genderEditSelect').val(localStorage.userGender);
		$('#emailEditInput').val(localStorage.userEmail);
		//loadingHide("#contentEditProfile");
		$('#editBDate').combodate({
        value: moment(localStorage.userBdate, 'YYYY-MM-DD'),
		template:'DD MMMM YYYY',
        minYear: 1900,
        maxYear: moment().format('YYYY')
    	});  
}

//////////////////////////////////////////////////////
function getImage() {
	// $('#cameraImage').css('visibility', 'hidden');
          // Retrieve image file location from specified source
          navigator.camera.getPicture(getImageSuccess, function(message) {
                      alert('get picture failed');
                  },{
                      quality : 100,
                      destinationType : navigator.camera.DestinationType.FILE_URI,
                      sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
					  targetWidth: 130,
        			  targetHeight: 130,
					  correctOrientation: 1,
					  saveToPhotoAlbum: 0,
        			  allowEdit: 1
					 
					 
                  }
          );

      }
//////////////////////////////////////////////////////	  
function takeImage() {
	
    navigator.camera.getPicture(getImageSuccess, function(message) {
                      alert('get picture failed');
                  }, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 130,
        targetHeight: 130,
        correctOrientation: 1,
		saveToPhotoAlbum: 0,
        allowEdit: 1
        
    	}
	);
}
//////////////////////////////////////////////////////	  
function getImageSuccess(imageURI){
	//$("#popupSelectWith").hide();
	//window.history.back();
	globalProfileImageURI = imageURI;
	$('#imgEditPropic').attr('src', globalProfileImageURI);
	$('#imgPropic').attr('src', globalProfileImageURI);
	var d = moment();
	//var image = document.getElementById('imgEditPropic');
      //  image.src = imageURI;
        //$('#cameraImage').css('visibility', 'visible');
		//globalImageURI = imageURI;
		console.log(globalProfileImageURI);
		uploadPhotoProfileData(imageURI);
	
	}
function uploadPhotoProfileData(imageURI) {
			
		  //loadingShow("#contentEditProfile");
          var options = new FileUploadOptions();
          options.fileKey="file";
          options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
          options.mimeType="image/jpeg";
////
          var params = new Object();
          params.userId = localStorage.userId;
          //params.value2 = "param";
////
          options.params = params;
          options.chunkedMode = false;

          var ft = new FileTransfer();
          ft.upload(imageURI, encodeURI(serviceURL + "updatePicProfile.php"), uploadProPicwin, uploadProPicfail, options);
      }
//////////////////////////////////////////////////////
function uploadProPicwin(r) {
          console.log("Code = " + r.responseCode.toString()+"\n");
          console.log("Response = " + r.response.toString()+"\n");
          console.log("Sent = " + r.bytesSent.toString()+"\n");
		  
          alert("เปลี่ยนรูปโปรไฟล์ เรียบร้อยแล้ว!");
		  //$('#imgPropic').attr('src', globalProfileImageURI);
		  getUserDetail();
		   //loadingHide("#contentEditProfile");
		  
		  //$.mobile.changePage("#profilePage", { changeHash: false });
		  //$.mobile.changePage( "../resources/us.html", { transition: "slideup", changeHash: false });
      }

      function uploadProPicfail(error) {
		  //loadingHide("#contentEditProfile");
          alert("An error has occurred: Code = " + error.code);
      }
//////////////////////////////////////////////////////	 
//function submitEditProfile(){
//	
//	uploadPhotoProfileData(globalProfileImageURI);
//	
//	}
function editUserBindEvent(){
	$("#nameEditInput").on('focusin', function() {editState = false; })
					   .on('keyup', function() {editState = true; })
					   .on('focusout', updateRName);
	$("#surnameEditInput").on('focusin', function() {editState = false; })
					   .on('keyup', function() {editState = true; })
					   .on('focusout', updateSurName);
	$("#genderEditSelect").on('change', updateGender);
	$("#editBDate").on('change', updateBDate);
	$("#emailEditInput").on('focusin', function() {editState = false; })
						.on('keyup', function() {editState = true; })
						.on('focusout', checkEditEmail);
	
}
//////////////////////////////////////////////////////	
function updateRName (){
	if(editState===true){
	$("#pMsgEditRname").text("กำลังดำเนินการ").css("color", "blue").show();
	var Id = localStorage.userId;
	var rn = $("#nameEditInput").val();
	var url = serviceURL + 'updateUserProfile.php';
	if (rn !== '') {
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					userid: Id, 
					realname: rn
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						window.localStorage.userRName = rn;
						getUserDetail();
						getEditUserDetail();
						$("#pMsgEditRname").text("เปลี่ยนชื่อเป็น " + rn + " เรียบร้อยแล้ว").css("color", "green").fadeOut(3200);
						console.log(res);
					} else {
						$("#pMsgEditRname").text("มีบางอย่างผิดพลาด").css("color", "red");
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
	} else {
		$("#pMsgEditRname").text("กรุณากรอกชื่อจริงของคุณ").css("color", "red").show();
	}
	return false;			
			}
	}
//////////////////////////////////////////////////////
function updateSurName (){
	if(editState===true){
	$("#pMsgEditSurname").text("กำลังดำเนินการ").css("color", "blue").show();
	var Id = localStorage.userId;
	var rsn = $("#surnameEditInput").val();
	var url = serviceURL + 'updateUserProfile.php';
	if (rsn !== '') {
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					userid: Id, 
					realsname: rsn
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						window.localStorage.userSurname = rsn;
						getUserDetail();
						getEditUserDetail();
						$("#pMsgEditSurname").text("เปลี่ยนนามสกุลเป็น " + rsn + " เรียบร้อยแล้ว").css("color", "green").fadeOut(3200);
						console.log(res);
					} else {
						$("#pMsgEditSurname").text("มีบางอย่างผิดพลาด").css("color", "red");
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
	} else {
		$("#pMsgEditSurname").text("กรุณากรอกนามสกุลจริงของคุณ").css("color", "red").show();
	}
	return false;			
			}
	}
//////////////////////////////////////////////////////
function updateGender (){
	
	$("#pMsgEditGender").text("กำลังดำเนินการ").css("color", "blue").show();
	var Id = localStorage.userId;
	var g = $("#genderEditSelect").val();
	var url = serviceURL + 'updateUserProfile.php';
	
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					userid: Id, 
					gender: g
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						window.localStorage.userGender = g;
						getUserDetail();
						getEditUserDetail();
						$("#pMsgEditGender").text("เรียบร้อยแล้ว").css("color", "green").fadeOut(3200);
						console.log(res);
					} else {
						$("#pMsgEditGender").text("มีบางอย่างผิดพลาด").css("color", "red");
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
	//////////////////////////////////////////////////////	
function updateBDate (){
	 var bday = moment($('#editBDate').val(), "DD-MM-YYYY").format('YYYY-MM-DD');
	
	$("#pMsgEditBdate").text("กำลังดำเนินการ").css("color", "blue").show();
	var Id = localStorage.userId;
	var bd = bday;
	var url = serviceURL + 'updateUserProfile.php';
	
		if(bday !== "Invalid date"){
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					userid: Id, 
					birthdate: bd
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						window.localStorage.userBdate = bd;
						getUserDetail();
						getEditUserDetail();
						$("#pMsgEditBdate").text("เรียบร้อยแล้ว").css("color", "green").fadeOut(3200);
						console.log(res);
					} else {
						$("#pMsgEditBdate").text("มีบางอย่างผิดพลาด").css("color", "red");
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
	} else {
		$("#pMsgEditBdate").text("กรุณากรอกวันเกิดให้ถูกต้อง").css("color", "red").show();
	}
	return false;			
			
	}
	//////////////////////////////////////////////////////	
function updateEmail (){
	
	
	var Id = localStorage.userId;
	var e = $("#emailEditInput").val();
	var url = serviceURL + 'updateUserProfile.php';
	
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					userid: Id, 
					email: e
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						window.localStorage.userEmail = e;
						getUserDetail();
						getEditUserDetail();
						$("#pMsgEditE").text("เปลี่ยน Email เรียบร้อยแล้ว").css("color", "green").fadeOut(3200);
						console.log(res);
					} else {
						$("#pMsgEditE").text("มีบางอย่างผิดพลาด").css("color", "red");
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
	
//////////////////////////////////////////////////////////////////////////////
function checkEditEmail() {
	if(editState===true){
	var e = $("#emailEditInput").val();
	var url = serviceURL + 'checkUsedEmail.php';
	$("#pMsgEditE").text("กำลังดำเนินการ").css("color", "blue").show();
	if (e !== '') {
		if (checkEmailRegEx(e) === true) {
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					email: e
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						$("#pMsgEditE").text(" Email นี้มีผู้ใช้แล้ว").css("color", "red");
					} else {
						
						$("#pMsgEditE").text(" Email นี้สามารถใช้ได้").css("color", "green");
						updateEmail();
					}
				},
				error: function(e) {
					console.log(e.message);
					navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต");
				},
				complete: function(e) {
					console.log("message");
				}
			});
		} else {
			$("#pMsgEditE").text(" กรุณากรอก Email ให้ถูกต้อง ").css("color", "red");
		}
	} else {
		$("#pMsgEditE").text("กรุณากรอก Email").css("color", "red");
	}
	return false;
	}
}
//////////////////////////////////////////////////////////////////////////////