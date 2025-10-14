// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: tv;

const MID = args.widgetParameter || '280793434'//UP主MID，即个人空间网址后面那段数字 https://space.bilibili.com/280793434

let apiUrl = "http://api.bilibili.com/x/relation/stat?vmid="+MID
let data = await loadData()
let widget = await createWidget(data)

if (config.runsInApp) {
	widget.presentSmall();
}
Script.setWidget(widget)
Script.complete()

async function createWidget(data) {
	let widget = new ListWidget()
	widget.backgroundColor = Color.white()
	
	let header = widget.addStack()
	let icon = header.addImage(await loadImage('https://www.bilibili.com/favicon.ico'))
	icon.imageSize = new Size(15, 15)
	header.addSpacer(10)
	let title = header.addText("哔哩哔哩粉丝")
	title.textColor = Color.black()
	title.textOpacity = 0.9
	title.font = Font.lightSystemFont(14)
	widget.addSpacer(20)

	let flTxt = widget.addText(toThousands(data.data['follower']))
	flTxt.textColor = new Color("#fb7299")
	flTxt.font = Font.boldRoundedSystemFont(getFontSize(data.data['follower']))
	flTxt.centerAlignText()

	widget.addSpacer(20)

	let utTxt = widget.addText('更新于:'+nowTime())
	utTxt.textColor = Color.black()
	utTxt.font = Font.systemFont(12)
	utTxt.textOpacity = 0.5
	utTxt.centerAlignText()

	widget.url = 'bilibili://'

	return widget
}
  
async function loadData() {
	let req = new Request(apiUrl)
	req.allowInsecureRequest = true
	let json = await req.loadJSON()
	console.log(json)
	return json
}

async function loadImage(imgUrl) {
	console.log(imgUrl)
	let req = new Request(imgUrl)
	req.allowInsecureRequest = true
	let image = await req.loadImage()
	return image
}

function toThousands(num) {
	return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

function nowTime(){
	let date = new Date()
	return date.toLocaleTimeString('chinese', { hour12: false })
}

function getFontSize(num){
	if(num<99){
		return 38
	}else if(num<9999 && num>100){
		return 30
	}else if(num<99999 && num>10000){
		return 28
	}else if(num<999999 && num>100000){
		return 24
	}else if(num<9999999 && num>1000000){
		return 22
	}else{
		return 20
	}
}