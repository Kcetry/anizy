//待完善:foundation  SEO
function search() {
	$(".sk-fading-circle").show();
	$("#content").css("opacity","0.2");
	var data = {"searchWord":$("#searchWord").val()};
	$.post("datasheet", data, function(obj){
		$(".sk-fading-circle").hide();
		$("#content").css("opacity","1.0");
		//第一个页码
		obj["firstPage"] = 1;
		if(obj["pageCount"] > 9) {
			//最后的页码
			obj["lastPage"] = 10
			//剩余的页
			obj["otherPages"] = obj["pageCount"]-1;
		}else {
			obj["lastPage"] = obj["pageCount"];
			obj["otherPages"] = 0;
		}
		$("#result").html(doT.template($("#resultTemplate").html())(obj));
		$("#p1").parent().addClass("pure-menu-selected");
	});
}

//jquery获取倒数第二个元素
//var a = $(".pure-menu-item").eq(-2)

function openPage(id) {
	id = parseInt(id.substr(1,id.length));
	
	$(".sk-fading-circle").show();
	$("#content").css("opacity","0.2");

	var data = {
		"searchWord":$("#searchWord").val(),
		"pageNumber": id
	}
	
	$.get("page/"+data.pageNumber,data,function(obj){
		$(".sk-fading-circle").hide();
		$("#content").css("opacity","1.0");
		//向前翻页
		if(id % 10 == 0) {
			obj["firstPage"] = id-9;
			obj["otherPages"] = obj["pageCount"]-obj["firstPage"];
			obj["lastPage"] = id;
			
		//向后翻页
		}else if(id % 10 == 1){
			obj["firstPage"] = id;
			obj["otherPages"] = obj["pageCount"]-id;
			console.log(obj["otherPages"]);
			if(obj["otherPages"] < 10){
				obj["lastPage"] = obj["otherPages"]+id;
			}else {
				obj["lastPage"] = id + 9;
			}
		}else {
			obj["firstPage"] = id - id % 10 + 1;
			obj["otherPages"] = obj["pageCount"] - obj["firstPage"]
			if(obj["otherPages"] < 10){
				obj["lastPage"] = obj["firstPage"] + obj["otherPages"]
			}else {
				obj["lastPage"] = obj["firstPage"] + 9;
			}
		}
		$("#result").html(doT.template($("#resultTemplate").html())(obj));
		$("#p"+id).parent().addClass("pure-menu-selected");
	});
}

function downloads(id) {
	$(".sk-fading-circle").show();
	$("#content").css("opacity","0.2");
	var url = $("#"+id).attr("url");
	$("#"+id).css("color","blue");
	var data = {
		"fileName":url.slice(url.lastIndexOf('/')+1,url.lastIndexOf('.'))+".pdf",
		"url": url
	}

	$.get("datasheet",data,function(path){
		$(".sk-fading-circle").hide();
		$("#content").css("opacity","1.0");
		window.open(path);
	});
}
