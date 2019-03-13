
var gameid = '990001';
var pageType = 'stuff';
var final_img_line = '';


//console.log(section)
/*
var section_no = '1';
line_text = 'LINE_'+section_no+': TXT '
line_id = 'line_'+section_no
img_section_id = 'img_section_'+section_no
editor_no = 'editor'+section_no
section = section_template.replace("%line_text%", line_text)
section = section.replace("%line_id%", line_id)
section = section.replace("%img_section%", img_section_id)
section = section.replace("%no%", section_no)
section = section.replace("%editor_no%", editor_no)
//console.log(section)

$("#section_1").html(section)
*/
//generate_inline()
//$('#editor1').ckeditor();
//CKEDITOR.inline(editor_no);

var block_template = "<div id=\"%section_no%\" class='line_block'>%data%</div>..."
var button_line_template = "<button type=\"button\" onclick=\"change_type(%no%)\">切换类型</button>"
var button_add_img_template = "<button type=\"button\" onclick=\"add_img_text(%no%)\">添加图片</button>"
var button_del_img_template = "<button type=\"button\" onclick=\"del_img_text(%no%)\">重置图片</button>"

var img_line_template = "<div id='%img_id%' class='%drawer_no%'>../img/%gameid%/%pageType%/%img_id%.jpg<br/></div>"
var number = '';

function submit_pdf_info() {
	pdf_name = document.getElementById("pdf_name").value;
	crop_len = document.getElementById("crop_len").value;
	search_name = document.getElementById("search_name").value;
	rulebook_name = document.getElementById("rulebook_name").value;
	lang_name = document.getElementById("lang_name").value;
	source_name = document.getElementById("source_name").value;
	source_detail = document.getElementById("source_detail").value;
	if(pdf_name === '') {
		alert('请输入gameid');
		return
	}
	if(pageType === '') {
		alert('请选择pageType');
	}
	pdf_query_url = 'http://180.76.244.130:3000/games/savePDFInfo';
	$.ajax({
		url: pdf_query_url,
		data: {
			pdf_name: pdf_name,
			crop_len: crop_len,
			search_name: search_name,
			rulebook_name: rulebook_name,
			lang_name: lang_name,
			source_name: source_name,
			source_detail: source_detail
		},
		success: function(data) {
			console.log("savePDFInfo Success")
		}
	});
}

var add_line = function(){
	gameid = document.getElementById("gameid").value
	pageType = document.getElementById("pageType").value 
	if (gameid === ''){
		alert('请输入gameid')
		return
	}else{
		//gameid = document.getElementById("gameid").value
    
	}
	if (pageType === ''){
		alert('请选择pageType')
		return
	}else{
		//pageType = document.getElementById("pageType").value 
	}
	var line_objects = document.getElementsByClassName("line_block")
	//console.log(line_objects)
	//console.log(line_objects)
	$.each(line_objects,function(i,j){
		if(line_objects.length === (i+1)){
			//console.log(i)
			section_no = i+2
			generate_section_html(section_no)
		}
	})
	if (line_objects.length === 0){
		generate_section_html(1)
	}
	//CKEDITOR.inline(editor_no);
	
}

var generate_section_html = function(section_no){
	//section_text += '...'
			
			line_text = 'LINE_'+section_no+': TXT '
			line_id = 'line_'+section_no
			img_section_id = 'img_section_'+section_no
			editor_no = 'editor'+section_no
			
			section = section_template.replace("%line_text%", line_text)
			section = section.replace("%line_id%", line_id)
			section = section.replace("%img_section%", img_section_id)
			section = section.replace("%no%", section_no)
			section = section.replace("%editor_no%", editor_no)
			
			//console.log(section)
			//console.log(section_text)
			block_text = block_template.replace('%section_no%','section_'+section_no)
			block_text = block_text.replace("%data%",section)
			//console.log(block_text)
			
			html = document.getElementById('section_block').innerHTML
			//console.log(html)
			document.getElementById('section_block').innerHTML = html.replace('...',block_text)
			//$(document).ready(function() {
};

var del_line = function(){
	gameid = document.getElementById("gameid").value
	pageType = document.getElementById("pageType").value 
	if (gameid === ''){
		alert('请输入gameid')
		return
	}else{
		//gameid = document.getElementById("gameid").value
    
	}
	if (pageType === ''){
		alert('请选择pageType')
		return
	}else{
		//pageType = document.getElementById("pageType").value 
	}
	var line_objects = document.getElementsByClassName("line_block")
	$.each(line_objects,function(i,j){
		
		if(line_objects.length === (i+1)){
			if(i === 0){
				alert('至少保留1个元素')
				return
			}
			var temp_no = i+1
			//console.log("#section_"+temp_no)
			$("#section_"+temp_no).remove()
		}
	})
	
}

var change_type = function(number){
	gameid = document.getElementById("gameid").value
	pageType = document.getElementById("pageType").value 
	if (gameid === ''){
		alert('请输入gameid')
		return
	}else{
		//gameid = document.getElementById("gameid").value
    
	}
	if (pageType === ''){
		alert('请选择pageType')
		return
	}else{
		//pageType = document.getElementById("pageType").value 
	}
	line_id = 'line_'+number
	line_text = document.getElementById(line_id).innerHTML
	line_text_arr = line_text.split(' ');
	//console.log(line_text_arr[1])
	if (line_text_arr[1] === 'TXT'){
		line_text = 'LINE_'+number+': IMG '
		button_line = button_line_template.replace('%no%',number)
		button_add_img = button_add_img_template.replace('%no%',number)
		button_del_img = button_del_img_template.replace('%no%',number)
		line_html = line_text+button_line+button_add_img+button_del_img
		$('#'+line_id).html(line_html)
		
		img_id = 'img_'+number+'_1'
		img_line = img_line_template.replace('%img_id%',img_id)
		img_line = img_line.replace('%drawer_no%','drawer_'+number)
		
		img_line = img_line.replace('%img_id%',img_id)
		img_line = img_line.replace('%gameid%',gameid)
		img_line = img_line.replace('%pageType%',pageType)
		$('#img_section_'+number).html(img_line)
		
	}
	if (line_text_arr[1] === 'IMG'){
		line_text = 'LINE_'+number+': TXT '
		button_line = button_line_template.replace('%no%',number)
		
		button_add_img = button_add_img_template.replace('%drawer_no%','drawer_'+number)
		button_add_img = button_add_img.replace('%no%',number)
		button_del_img = button_del_img_template.replace('%no%',number)
		
		line_html = line_text+button_line
		$('#'+line_id).html(line_html)
		
		$('#img_section_'+number).html('')
	}
	
}

var add_img_text = function(number){
	var img_objects = document.getElementsByClassName("drawer_"+number)
	final_img_line = '';
	//console.log(img_objects.length)
	//console.log(img_objects)
	$.each(img_objects,function(index,content){
		img_no = index + 1
		img_id = 'img_'+number+'_'+img_no
		img_line = img_line_template.replace('%img_id%',img_id)
		img_line = img_line.replace('%drawer_no%','drawer_'+number)
		
		img_line = img_line.replace('%img_id%',img_id)
		img_line = img_line.replace('%gameid%',gameid)
		img_line = img_line.replace('%pageType%',pageType)
		
		final_img_line += img_line
		if(img_objects.length === img_no){
			img_no = img_no + 1
			img_id = 'img_'+number+'_'+img_no
			//console.log(img_id)
			img_line = img_line_template.replace('%img_id%',img_id)
			img_line = img_line.replace('%drawer_no%','drawer_'+number)
			
			img_line = img_line.replace('%img_id%',img_id)
			img_line = img_line.replace('%gameid%',gameid)
			img_line = img_line.replace('%pageType%',pageType)
			
			final_img_line += img_line
		}
	})
	
	$('#img_section_'+number).html(final_img_line)
}


var del_img_text = function(number){
	img_id = 'img_'+number+'_1'
		img_line = img_line_template.replace('%img_id%',img_id)
		img_line = img_line.replace('%drawer_no%','drawer_'+number)
		
		img_line = img_line.replace('%img_id%',img_id)
		img_line = img_line.replace('%gameid%',gameid)
		img_line = img_line.replace('%pageType%',pageType)
	
	//$('#img_section_'+number).html(img_line)
	$('#img_section_'+number).html(null)
}


var add_new_line = function(){
	add_line()
	var line_objects = document.getElementsByClassName("line_block")
	$.each(line_objects, function(index, content) {
		line_num = index + 1
		if(line_objects.length === line_num) {
			//click_submit_from(index)
			editor_no = 'editor'+line_num
		}
	});
	generate_inline()
}
