var gid
function loadUserGroup(){
	clearCache();//
	gid = localStorage.userGroup;
if (gid !== '000000'){
	loadingShow("#contentGroup");
		
	var url = serviceURL + 'loadGroupDetail.php';
	$.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'jsonp',
			data: {
				groupid: gid
			},
			crossDomain: true,
			timeout: 10000,
			success: function(res) {
				console.log(res);
				console.log(!jQuery.isEmptyObject(res));
				if (!jQuery.isEmptyObject(res)) {
					//store
					console.log(res.user_id);
					$('#spGroupName').text(res.group_name);
					$('#spGroupDetail').text(res.group_detail);
					uid = window.localStorage.userId;
					loadGroupFeed();
					/*window.localStorage.username = u;
					window.localStorage.password = p;
					window.localStorage.userId = res.user_id;
					window.localStorage.userRName = res.user_rname;
					window.localStorage.userSurname = res.user_surname;
					window.localStorage.userEmail = res.user_email;
					window.localStorage.userBdate = res.user_bdate;
					window.localStorage.userGender = res.user_gender;
					window.localStorage.userImageUrl = res.user_imageUrl;
					window.localStorage.userStatus = res.user_status;
					window.localStorage.userGroup = res.user_group;
					console.log(typeof res.user_group);*/
					//window.localStorage.userId = res.user_id;
					//window.location.replace(some.html);
					//window.open("home.html", '_self');
					 //$(form)[0].reset();
					//$.mobile.changePage("#homePage");
					//loadFeed();
				} else {
					navigator.notification.alert("Load Group Detail failed", function() {});
				}
			
				//$("#submitButton").removeAttr("disabled");
				loadingHide("#contentGroup");
			},
			error: function(e) {
				console.log(e.message);
				navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				loadingHide("#contentGroup");
			},
			complete: function(e) {
				console.log("message");
				$("#submitButton").removeAttr("disabled");
				loadingHide("#contentGroup");
			}
		});
	}else{
		
		$('#spGroupName').text("ยังไม่ได้เลือกกลุ่ม");
		$('#spGroupDetail').text(" ยังไม่มีรายละเอียดกลุ่ม. กรุณาเลือกหรือสร้างกลุ่ม");
		}
}
	
function loadGroupFeed(){
	
	loadingShow("#contentGroup");
	var output = $('#feedGroupMiddle');

	//console.log($( "#getDetailThisUser" ).data( "otherUId"));
	//console.log(uid);
	output.empty();
	$('#feedGroupBottom').empty();
	$('#feedGroupTop').empty();
	var url = serviceURL + 'loadGroupReport.php';
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {
				groupid: gid,
				userid: uid				
			},
		
		crossDomain: true,
		timeout: 10000,
		success: function(data, status){
			console.log(status);
			console.log(data);
			$.each(data, function(i,item){ 

				htmlReport(item);
				
				output.append(reportHtml);
				loadingHide("#contentGroup");
			});
		},
		error: function(){
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		   				loadingHide("#contentGroup");

		}
	});
	
}

function loadNewGroupFeed(){
	
	var output = $('#feedGroupTop');	
	var ff = 'new';
	var url = serviceURL + 'loadGroupReport.php';
	
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#feedGroupMiddle').children('div:first-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadNewGroupFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#feedGroupTop').children('div:first-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadNewGroupFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////	
function loadNewGroupFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){

	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: { 
				groupid: gid,
				userid: uid,
				userReportFlag: ff,
				lastRepViewDate: lastDivDate,
				lastRepViewId: lastDivId
			},
		crossDomain: true,
		timeout: 10000,
		success: function(data, status){
			console.log(output.html());
			console.log(output.html().length);
			console.log(data);
			console.log(!jQuery.isEmptyObject(data));
		
		if (!jQuery.isEmptyObject(data)) {
			$.each(data, function(i,item){ 
				
				htmlReport(item);
				
				output.prepend(reportHtml);
			});
		}else{
			$("#pMsgGroupFeed").text('ฟีดข่าวล่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
			
			}
		},
		error: function(){
			console.log(output.html().length);
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		}
	});
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////	
function loadOldGroupFeed(){
	
	
	var output = $('#feedGroupBottom');	
	var ff = 'old';
	var url = serviceURL + 'loadGroupReport.php';
	
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#feedGroupMiddle').children('div:last-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadOldGroupFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#feedGroupBottom').children('div:last-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadOldGroupFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}

function loadOldGroupFeedAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: { 
				groupid: gid,
				userid: uid,
				userReportFlag: ff,
				lastRepViewDate: lastDivDate,
				lastRepViewId: lastDivId
			},
		crossDomain: true,
		timeout: 10000,
		success: function(data, status){
			console.log(output.html());
			console.log(output.html().length);
			console.log(data);
			console.log(!jQuery.isEmptyObject(data));
		
		if (!jQuery.isEmptyObject(data)) {
			$.each(data, function(i,item){ 
			
				htmlReport(item);
				
				output.append(reportHtml);
			});
		}else{
			$("#pMsgGroupFeedB").text('ฟีดข่าวเก่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
			console.log(output.html());
			//output.empty();
			}
		},
		error: function(){
			console.log(output.html().length);
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		}
	});
	}
	
/*function htmlReportUser(item){
	var d = moment();
	var de = moment(item.report_date, 'YYYY-MM-DD HH:mm:ss', 'th');
	reportHtml = '<div class="ui-corner-all custom-corners" id="reportView" data-report-date="'+item.report_date+'" data-report-id="'+item.report_id+'" data-report-by="'+item.report_by+'"><a href="#otherProfilePage" class="ui-corner-all" id="lnkThisUpro" onClick="getOtherUserDetail(' + item.report_by + ')"><div class="ui-bar ui-bar-b"><h3><strong><span id="spNameFeed">' + item.report_realNameBy
				+ '</span></strong></h3></div></a><div class="ui-body ui-body-a"><div class="ui-grid-a">'
				 + '<div class="ui-block-a" id="miniPropicHome">' 
				 + '<img alt="" height="40" id="imgMiniPropicHome" src="'+serviceURL + "../img/userprofileimage/" + item.report_userImageUrl + "?" + d.format() + '" width="40">' 
				 + '</div><div class="ui-block-b" id="miniReportdetail">' 
				 + 'วันที่: <span id="spDateReport">' + de.format('DD MMMM YYYY')
				 + '</span><br>เวลา: <em><span id="spTimeReport">' + de.format('HH:mm:ss')
				 + '</span></em></div></div><div class="ui-grid-solo"><b>หัวเรื่อง:</b> <span id="spTitle">' + item.report_title
				 + '</span><br><b>รายละเอียด:</b> <em><span id="spContent">' + item.report_content
				 + '</span></em><br><br><a href="#fullImgPage" class="lnkThisImg" onClick="getFullImg('+ "'"+ item.report_imgUrl + "'"+')"><img align="center" alt="" id="imgReport" src="' +serviceURL + "../img/reportPic/" + item.report_imgUrl + "?" + d.format()
				 + '"></a><b>สถานที่:</b> <em><span id="spLocatReport">' + item.report_locat
				 + '</span></em><br><a href="#mapPage" id="lnkThisMap" data-ajax="false" onClick="showThisMap('+ item.report_lat + ", " + item.report_long +')"><img id="imgMapReport" src="http://maps.googleapis.com/maps/api/staticmap?center=' + item.report_lat + "," + item.report_long
				 + '&zoom=16&size=400x400&maptype=roadmap&markers=color:green%7C' + item.report_lat + "," + item.report_long
				 + '&sensor=true"></a>'
				 + '<div class="ui-grid-a"><div class="ui-block-a">'
				 + '<a class="ui-btn ui-mini ui-icon-refresh ui-btn-icon-left ui-corner-all activeOnce" href="#editReportPage" id="editUserReportBtn" data-transition="none" onClick="getEditReport('+"'"+ item.report_id +"', " +"'"+item.report_title + "', " +"'"+ encodeURI(item.report_content) +"'"+');">แก้ไข</a>'
            	 + '</div><div class="ui-block-b">'
				 + '<a class="ui-btn ui-mini ui-icon-refresh ui-btn-icon-left ui-corner-all activeOnce" href="#deleteReportDialog" id="delReportPopupBtn" data-rel="popup" data-position-to="window" data-transition="pop" onClick="setDelReportId(' +"'"+ item.report_id + "'"+')">ลบ</a>'
		   		 + '</div></div></div></div><br>';
	
	
	}*/