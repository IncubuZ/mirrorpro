var editState;
var idReport;
function getEditReport (reportId, reportTitle, reportContent){
		$("#sumitEditRpBtn").addClass("ui-state-disabled");
		idReport = reportId;
		clearCache();
		var d = moment();
		//loadingShow("#contentEditProfile");
		$('#editReportTitleInput').val(reportTitle);
		$('#editReportContentInput').val(decodeURI(reportContent));
		/*$('#imgEditPropic').attr('src', serviceURL + "../img/userprofileimage/" + localStorage.userImageUrl+"?"+d.format());
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
    	});*/  
}

//////////////////////////////////////////////////////
function editReportBindEvent(){
	console.log("nnnn");
	$("#editReportTitleInput").on('focusin', function() {editState = false; })
					   .on('keyup', function() {editState = true; $("#sumitEditRpBtn").removeClass("ui-state-disabled");})
					   .on('focusout', updateReportTitle);
	$("#editReportContentInput").on('focusin', function() {editState = false; })
					   .on('keyup', function() {editState = true; $("#sumitEditRpBtn").removeClass("ui-state-disabled");})
					   .on('focusout', updateReportContent);	
}

//////////////////////////////////////////////////////	
function updateReportTitle (){
	var tt_ct = 0;

	var rpId = idReport;
	var editV;
	var url = serviceURL + 'updateReport.php';
	if(editState===true){
	$("#pMsgEditReport").text("กำลังดำเนินการ").css("color", "blue").show();
		editV = $("#editReportTitleInput").val();
	if (editV !== '') {
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					edittype: tt_ct,
					reportid: rpId, 
					editval: editV
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						//window.localStorage.userRName = rn;
						loadThisUserReport();
						//getEditUserDetail();
						$("#pMsgEditReport").text("แก้ไขข้อมูล เรียบร้อยแล้ว").css("color", "green").fadeOut(3200);
						
						console.log(res);
					} else {
						$("#pMsgEditReport").text("มีบางอย่างผิดพลาด").css("color", "red").fadeOut(3200);
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
		$("#pMsgEditReport").text("กรุณากรอกข้อมูล!").css("color", "red").show().fadeOut(3200);
	}
	return false;			
			}
	}
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////	
function updateReportContent (){
	console.log(tt_ct);
	var tt_ct = 1;
	var rpId = idReport;
	var editV;
	var url = serviceURL + 'updateReport.php';
	if(editState===true){
	$("#pMsgEditReport").text("กำลังดำเนินการ").css("color", "blue").show();
	

			editV = $("#editReportContentInput").val();
			
	if (editV !== '') {
		
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					edittype: tt_ct,
					reportid: rpId, 
					editval: editV
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						//window.localStorage.userRName = rn;
						loadThisUserReport();
						//getEditUserDetail();
						$("#pMsgEditReport").text("แก้ไขข้อมูล เรียบร้อยแล้ว").css("color", "green").fadeOut(2000);
						console.log(res);
					} else {
						$("#pMsgEditReport").text("มีบางอย่างผิดพลาด").css("color", "red").fadeOut(3200);
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
		$("#pMsgEditReport").text("กรุณากรอกข้อมูล!").css("color", "red").show().fadeOut(3200);
	}
	return false;			
			}
	}
//////////////////////////////////////////////////////
function setDelReportId (reportIdDelete){
	idReport = null;
	idReport = reportIdDelete;
	console.log(reportIdDelete);
	}
function deleteReport (){
	
	var rpId = idReport;
	var url = serviceURL + 'deleteReport.php';
	console.log(rpId);
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					reportid: rpId
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						//window.localStorage.userRName = rn;
						loadThisUserReport();
						//getEditUserDetail();
						//$("#pMsgEditReport").text("แก้ไขข้อมูล เรียบร้อยแล้ว").css("color", "green").fadeOut(2000, function(){window.history.back();});
						navigator.notification.alert("ลบข้อมูล เรียบร้อยแล้ว");
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
	
function backHistory(){window.history.back();}