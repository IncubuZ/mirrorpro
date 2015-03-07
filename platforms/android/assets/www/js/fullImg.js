function getFullImg(fullImgSrc){
	var d = moment();
	//var fullImgSrc = "img/newyork.jpg";
	console.log(fullImgSrc);
	$('#imgFullImg').attr('src', serviceURL + "../img/reportPic/" + fullImgSrc +"?"+d.format());
	/*$('#imgPropic').attr('src', serviceURL + "../img/userprofileimage/" + localStorage.userImageUrl +"?"+d.format());
	serviceURL + "../img/reportPic/" + item.report_imgUrl + "?" + d.format()*/
	}