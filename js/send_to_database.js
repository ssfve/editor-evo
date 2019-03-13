var section_template =
	"<div id=\"%line_id%\">%line_text%<button type=\"button\" onclick=\"change_type(%no%)\">切换类型</button></div>" +
	"<div class=\"container\">"
	//+"<div class=\"tabs__wrapper\">"
	//+"<div class=\"tabs__content-section\">"
	//+"<div id=\"panel1\" class=\"tabs__content tabs__content--active\">"
	//+"<div class=\"demo3-container\" id=\"ckdemo3\" aria-labelledby=\"inline\" style=\"display: block;\">"
	//+"<div class=\"demo3-container__header-left\">"
	+
	"<h4 id='%editor_no%' contenteditable=\"true\"></h4>" +
	"<div id=\"%img_section%\"></div>" +
	"</div>"
//</div></div>"
//</div></div></div>"


var lineNo = '';
var lineFlag = '';

var queryGameInfoEN = function(json) {
	try {
		//alert('hello')
		nameEN = json.name
		//imgCaption = '../img/'+nameEN+'/caption.jpg';
		//alert(imgCaption)
		//$('#caption-pic').css({'background-image': imgCaption})
		//alert(averageweight)
		//alert(suggested_numplayers)
		//data = list(records[0])
		//alert(current_page)
		if(current_page === 'gamerule') {
			nameEN_temp = change_nameEN(nameEN);
			pageTitle = nameCN + nameEN_temp;
			headerTitle = nameCN + nameEN_temp;
			$("title").html(pageTitle);
			$('#headerTitle').html(headerTitle);
			//alert(headerTitle)
		}

	} catch(e) {
		alert(e)
		//document.write(e.description); 
	} finally {

	}
};

var id = '';
var type = '';
var num = '';
var textURL = 'http://180.76.244.130:3000/database/writeTextDB';
var imgURL = 'http://180.76.244.130:3000/database/writeImgDB';
var controlURL = 'http://180.76.244.130:3000/database/writeControlDB';
var del_text_url = 'http://180.76.244.130:3000/database/delTextDB';
var del_img_url = 'http://180.76.244.130:3000/database/delImgDB';
var del_control_url = 'http://180.76.244.130:3000/database/delControlDB';

function click_submit_url(url_query, del_url_query) {
	var line_objects = document.getElementsByClassName("line_block");
	//console.log(line_objects)
	if(url_query === textURL) {
		$.each(line_objects, function(index, content) {
			line_num = index + 1;
			text_content = document.getElementById("editor" + line_num).innerHTML;
			document.getElementById("response").innerHTML = '';
			$.ajax({
				url: url_query,
				data: {
					gameid: gameid,
					pageType: pageType,
					lineNum: line_num,
					text: text_content
				},
				success: function(data) {
					document.getElementById("response").innerHTML = data
				}
			});
		});
	}

	if(url_query === controlURL) {
		$.each(line_objects, function(index, content) {
			line_num = index + 1;
			line_id = 'line_'+line_num;
			line_text = document.getElementById(line_id).innerHTML;
			line_text_arr = line_text.split(' ');
			
			flag_temp = (line_text_arr[1]).toLowerCase();
			document.getElementById("response").innerHTML = '';
			$.ajax({
				url: url_query,
				data: {
					gameid: gameid,
					pageType: pageType,
					lineNum: line_num,
					flag: flag_temp
				},
				success: function(data) {
					//alert('afd')
					document.getElementById("response").innerHTML = data
				}
			});
		});
	}
	if (del_url_query === del_control_url){
		$.each(lineFlag, function(index, content) {
			line_num = index + 1;
			if (line_objects.length >= line_num){
				line_id = 'line_'+line_num
				line_text = document.getElementById(line_id).innerHTML
				line_text_arr = line_text.split(' ');
				
				flag_temp = (line_text_arr[1])
				document.getElementById("response").innerHTML = ''
				
				if(flag_temp === 'IMG'){
					flag_temp = 'txt'
				}
				if(flag_temp === 'TXT'){
					flag_temp = 'img'
				}
					$.ajax({
						url: del_url_query,
						data: {
							gameid: gameid,
							pageType: pageType,
							lineNum: line_num,
							flag: flag_temp
						},
						success: function(data) {
							//alert('afd')
							document.getElementById("response").innerHTML = data
						}
					});
			}else{
				flag_temp = lineFlag[index]
				$.ajax({
						url: del_url_query,
						data: {
							gameid: gameid,
							pageType: pageType,
							lineNum: line_num,
							flag: flag_temp
						},
						success: function(data) {
							//alert('afd')
							document.getElementById("response").innerHTML = data
						}
					});
			}
			
			
			
		});
	}
	
	if(url_query === imgURL) {
		//delete every image
		$.ajax({
			url: del_url_query,
					data: {
						gameid: gameid,
						pageType: pageType
					},
					success: function(data) {
						document.getElementById("response").innerHTML = data
					}
				});
				
		$.each(line_objects, function(index, content) {
			line_num = index + 1
			var img_objects = document.getElementsByClassName("drawer_" + line_num)
			//console.log(img_objects)
			$.each(img_objects, function(index, content) {
				img_num = index + 1;
				img_id = 'img_'+line_num+'_'+img_num;
				image_path = document.getElementById(img_id).innerHTML.replace('<br>','')
				document.getElementById("response").innerHTML = ''
				$.ajax({
					url: url_query,
					data: {
						gameid: gameid,
						pageType: pageType,
						lineNum: line_num,
						location: img_num,
						path: image_path
					},
					success: function(data) {
						document.getElementById("response").innerHTML = data
					}
				});
			});
		});
	}
}

function click_submit() {
	gameid = document.getElementById("gameid").value;
	pageType = document.getElementById("pageType").value;
	if(gameid === '') {
		alert('请输入gameid');
		return
	}
	if(pageType === '') {
		alert('请选择pageType');
		return
	}
	click_submit_url(textURL, del_text_url);
	click_submit_url(imgURL, del_img_url);
	click_submit_url(controlURL, del_control_url);
}

function upload_pdf() {
	console.log("upload started");
	pdf_file = document.getElementById("pdf_file").value;
	pdf_upload_url = 'http://180.76.244.130:3000/games/savePDF';
	$.ajax({
		url: pdf_upload_url,
		data: pdf_file,
		success: function(data) {
			console.log("savePDFInfo Success")
		}
	});
}

function click_submit_from(number) {
	textURL = 'http://180.76.244.130:3000/games/getTextInfo';
	temp_no = number + 1;
	document.getElementById("response").innerHTML = '';
	$.ajax({
		url: textURL,
		data: {
			gameid: gameid,
			pageType: pageType,
			lineNum: temp_no
		},
		dataType: 'json',
		success: function(data) {
			$('#editor' + temp_no).html(data.text_content)
		},
		error: function(data) {
			alert('记录不存在')
		},
		async: false
	});
}

var writeTextbox = function(json) {
	try {
		if(json.text_content !== null) {
			document.getElementById('editor').innerHTML = json.text_content
		}
	} catch(e) {
		//alert('error')
		alert(e)
	} finally {

	}
};

var getPageLineNum = function(id, page) {
	//$(obj).text(text)
	var textURL = 'http://180.76.244.130:3000/games/getPageLineNum';
	//alert(obj)
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: textURL,
			data: {
				gameid: id,
				pageType: page
			},
			dataType: 'json',
			success: function(data) {
				var temp = [];
				$.each(data, function(index, content) {
					temp[index] = content.flag;
				});
				//console.log(lineFlag)
				resolve(temp)
			},
			error: function(data) {}
		});
	});
	//return p
};

function ajax_wait_text() {

	var line_objects = document.getElementsByClassName("line_block")
	//console.log(line_objects)
	$.each(lineFlag, function(index, content) {
		line_num = index + 1
		//console.log(line_num)
		//if(line_objects.length <= lineFlag.length){
		//console.log(index)
		if(line_objects.length >= line_num) {
			console.log('line ' + line_num + ' already exists')
			line_id = 'line_'+line_num
			line_text = document.getElementById(line_id).innerHTML
			line_text_arr = line_text.split(' ');
			
			flag_temp = (line_text_arr[1]).toLowerCase()
			console.log(flag_temp)
			console.log(content)
			if(line_num === 1 && flag_temp !== content && content === 'img'){
				//console.log('in change')
				change_type(line_num)
			}
			click_submit_from(index)
			del_img_text(line_num)
		} else {
			console.log('added')
			add_line()
			if(content === 'img') {
			//console.log('in')
			change_type(line_num)
			//console.log(document.getElementById('editor'+temp_no))
			}
			click_submit_from(index)
		}
		//click_submit_from(index)
		//console.log(document.getElementById('editor3'))
		//console.log(document.getElementById('editor3'))
		//}
	});
	generate_inline()
}

var generate_inline = function() {
	var line_objects = document.getElementsByClassName("line_block")
	$.each(line_objects, function(i, j) {
		section_no = i + 1
		editor_no = 'editor' + section_no
		console.log(editor_no)
		//console.log(document.getElementsByClassName("cke_"+editor_no))
		cke_object = document.getElementById("cke_"+editor_no)
		console.log(cke_object)
		if(cke_object === undefined || cke_object === null){
			//console.log('in')
			CKEDITOR.inline(editor_no);
		}
	});
};

function read_page_db() {
	gameid = document.getElementById("gameid").value
	pageType = document.getElementById("pageType").value
	if(gameid === '') {
		alert('请输入gameid')
		return
	} else {
		//gameid = document.getElementById("gameid").value

	}
	if(pageType === '') {
		alert('请选择pageType')
		return
	} else {
		//pageType = document.getElementById("pageType").value 
	}
	var promise1 = getPageLineNum(gameid, pageType)
	promise1.then(function(data1) {
		lineFlag = data1
		console.log(lineFlag)
		ajax_wait_text(gameid, pageType, lineFlag)
		//console.log(document.getElementById('editor11').innerHTML)
		//console.log('out')
		var line_objects = document.getElementsByClassName("line_block")
		//console.log(line_objects)
		$.each(line_objects, function(index, content) {
			line_num = index + 1
			//console.log('in')
			if(line_objects.length > lineFlag.length) {
				//console.log('remove')
				del_line()
			}
		});
	});
};