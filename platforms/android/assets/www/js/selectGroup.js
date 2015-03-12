/*function getSelectGroupData(){
      var items="";
	  var url = serviceURL + 'loadAllGroup.php';
      $.getJSON(url,function(data){
        $.each(data,function(index,item) 
        {
          items+="<li>"+item.group_name+"</li>";
        });
        $("#selectGroupList").html(items); 
        $("#selectGroupList").listview("refresh");
      });
   
  }*/
 var globalGId=0;
 function getSelectGroupData(){
	clearCache();//
	loadingShow("#contentSelectGroup");
	var output = $('#selectGroupList');
	output.empty();
	
	  var url = serviceURL + 'loadAllGroup.php';
	  var items="";
	$.ajax({
		url: url,
		dataType: 'jsonp',
		//jsonp: 'jsoncallback',
		timeout: 10000,
		success: function(data, status){
			console.log(status);

			$.each(data, function(i,item){ 
			
				 items='<li><a href="#showGroupPage" onClick="getOneGroupData('+item.group_id+');">'+item.group_name+'</a></li>';
					output.append(items); 
        			output.listview("refresh");
			});
			loadingHide("#contentSelectGroup");
		},
		error: function(){
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!');
		   				loadingHide("#contentSelectGroup");

		}
	});
	
}
///////////////////////////////////////////////////////////////////////////////////////
function getOneGroupData(grpid){
	//clearCache();//
	loadingShow("#contentShowGroup");
	var tgid = grpid;
	globalGId = tgid;
	var url = serviceURL + 'loadGroupDetail.php';
	$.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'jsonp',
			data: {
				groupid: tgid
			},
			crossDomain: true,
			timeout: 10000,
			success: function(res) {
				console.log(res);
				console.log(!jQuery.isEmptyObject(res));
				if (!jQuery.isEmptyObject(res)) {
					//store
					console.log(res.user_id);
					$('#spOneGroupName').text(res.group_name);
					$('#spOneGroupDetail').text(res.group_detail);
					
					loadOneGroupFeed(tgid);
					
				} else {
					navigator.notification.alert("Load Group Detail failed", function() {});
				}
			
				//$("#submitButton").removeAttr("disabled");
				loadingHide("#contentShowGroup");
			},
			error: function(e) {
				console.log(e.message);
				navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				loadingHide("#contentShowGroup");
			},
			complete: function(e) {
				console.log("message");
				//$("#submitButton").removeAttr("disabled");
				loadingHide("#contentShowGroup");
			}
		});
	
}
///////////////////////////////////////////////////////////////////////////////////////
function loadOneGroupFeed(grpid){
	
	loadingShow("#contentShowGroup");
	var output = $('#feedGroupOne');
	uid = window.localStorage.userId;
	var tgid = grpid;
	//console.log($( "#getDetailThisUser" ).data( "otherUId"));
	//console.log(uid);
	output.empty();
	var url = serviceURL + 'loadGroupReport.php';
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: {
				groupid: tgid,
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
				loadingHide("#contentShowGroup");
			});
		},
		error: function(){
		   output.text('พบข้อผิดพลาดในการโหลดข้อมูล!!').show().css("color", "red").fadeOut(3200);
		   				loadingHide("#contentShowGroup");

		}
	});
	
}

/////////////////////////////////////////////////////////////////////////////////////////////	
function loadOldGroupOne(){
	
	
	var output = $('#feedGroupOneBottom');	
	var ff = 'old';
	var url = serviceURL + 'loadGroupReport.php';
	var tgid = globalGId;
	console.log(output.html().length);
///////////////////////////////////////////////////////////////////////////////////	
	if(output.html().length===0){
		var lastDiv = $('#feedGroupOne').children('div:last-child');
		var lastDivDate = lastDiv.data('report-date');
		var lastDivId = lastDiv.data('report-id');
		console.log(lastDivId);
		console.log(ff);
		loadOldGroupOneAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
///////////////////////////////////////////////////////////////////////////////////	
	}else{
		
	var lastDiv = $('#feedGroupOneBottom').children('div:last-child');
	var lastDivDate = lastDiv.data('report-date');
	var lastDivId = lastDiv.data('report-id');
	console.log(lastDivId);
	console.log(ff);
	loadOldGroupOneAjax(output,ff,url,lastDiv,lastDivDate,lastDivId);
	}
}

function loadOldGroupOneAjax(output,ff,url,lastDiv,lastDivDate,lastDivId){
	$.ajax({
		type: 'GET',
		url: url,
		contentType: "application/json",
		dataType: 'jsonp',
		data: { 
				groupid: tgid,
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
			$("#spGroupOneB").text('ฟีดข่าวเก่าสุดแล้ว.').show().css("color", "green").fadeOut(3200);
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
	
	
//////////////////////////////////////////////////////	
function selectThisGroup (){
	
	
	var Id = localStorage.userId;
	var tg = globalGId;
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
						checkGroup();
						loadUserGroup();
						//loadGroupFeed();
						window.history.back();//navigator.app.backHistory();
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