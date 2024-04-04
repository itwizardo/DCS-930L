var FlashDetect = new function() {
	var self = this;
    self.installed = false;
    var activeXDetectRules = [
		{
            "name":"ShockwaveFlash.ShockwaveFlash.7",
            "version":function(obj){return getActiveXVersion(obj);}
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash.6",
            "version":function(obj){
                var version = "6,0,21";
                try{
                	obj.AllowScriptAccess = "always";
                    version = getActiveXVersion(obj);
                }
                catch(err){}
                return version;
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash",
            "version":function(obj){return getActiveXVersion(obj);}
        }
    ];
    var getActiveXVersion = function(activeXObj){
        var version = -1;
        try{version = activeXObj.GetVariable("$version");}
        catch(err){}
        return version;
    };
    var getActiveXObject = function(name){
        var obj = -1;
        try{obj = new ActiveXObject(name);}
        catch(err){obj = {activeXError:true};}
        return obj;
    };
	self.FlashDetect = function() {
    	if(navigator.plugins && navigator.plugins.length>0){
        	var type = 'application/x-shockwave-flash';
            var mimeTypes = navigator.mimeTypes;
            if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
            	self.installed = true;
            }
        } else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
            var version = -1;
            for(var i=0; i<activeXDetectRules.length && version==-1; i++){
                var obj = getActiveXObject(activeXDetectRules[i].name);
                if(!obj.activeXError){
                    self.installed = true;
                }
            }
        }
    } ();
};
function CheckBrower()
{
    ba = navigator.userAgent;
    bn = navigator.appName;
    bv = navigator.appVersion;
    bv2 = bv.substring(0,3);
    if (ba.indexOf("Opera",0) != -1) {
        if (bv2 <= "9.0")
            return("Opera<9");
        else
            return("Opera");
    }
    if (ba.indexOf("OPR/",0) != -1)
        return("Opera");
    if (ba.indexOf("Firefox",0) != -1)
        return("Firefox");
    if (ba.indexOf("Chrome",0) != -1)
        return("Chrome");
    if (ba.indexOf("Safari",0) != -1)
        return("Safari");
    if (ba.indexOf("KKMAN",0) != -1)
         return("KKMAN");
    if (bn.indexOf("Microsoft Internet Explorer",0) != -1)
    { 
        bc1 = ba.indexOf("MSIE ",0);
        bc2 = ba.substring(bc1+5);
        bc3 = bc2.indexOf(";",0);
        bc4 = bc2.substring(0,bc3);
        bc5 = parseInt(bc4,10);
        if (bc5 < 10) {
            if ((bv.indexOf("Trident/6",0) != -1) && (bv.indexOf("Windows NT 6",0) != -1))
                return("IE1x");
            else
                return("IE");
        } else
            return("IE1x");
    } else {
        if ((bv.indexOf("Trident/7",0) != -1) && (bv.indexOf("Windows NT",0) != -1)) {
            ver = parseInt(bv.substring(bv.indexOf("Windows NT",0)+11), 10);
            if (ver >= 6)
                return("IE1x");
        }
    }
    if (bn.indexOf("Netscape",0) != -1)    
        return("Netscape");
    return("Unknow");
}
function supportJava()
{
    cc = 0;
    ba = navigator.userAgent;
    bb = CheckBrower();
    if (ba.indexOf("Edge/",0) != -1)
        return(0);
    if (bb == "Chrome") {
        aa=ba.indexOf("Chrome/");
        aa+=7;
        cc = parseInt(ba.substring(aa,aa+10))
    	if (cc >= 45)
	        return(0);
    }
    if (bb == "Opera") {
        aa=ba.indexOf("OPR/");
        aa+=4;
        cc = parseInt(ba.substring(aa,aa+10))
    	if (cc >= 36)
	        return(0);
    }
    return(1);
}
function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
function getSWF(swfName)
{
    if (navigator.appName.indexOf("Microsoft") != -1)
    {
    	var ver = getInternetExplorerVersion();
    	if (ver >= 10)
        	return document[swfName];
        else
        	return window[swfName];
    } else
        return document[swfName];
}
function showtime(index)
{
    var now = new Date();
    while (__sec >= 60) {
        __sec = __sec - 60;
        __min++;
    }
    while (__min >= 60) {
        __min = __min - 60;
        __hour++;
    }
    while (__min < 0) {
        __min = __min + 60;
        __hour--;
    }
    while (__hour >= 24) {
        __hour = __hour - 24;
        __date++;
    }
    while (__hour < 0) {
        __hour = __hour + 24;
        __date--;
    }
    now.setYear(__year);
    now.setMonth(__month-1);
    now.setDate(__date);
    now.setHours(__hour);
    now.setMinutes(__min);
    now.setSeconds(__sec);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    var hours = parseInt(__hour,10);
    var minutes = parseInt(__min,10);
    var seconds = parseInt(__sec,10);

    var month_1 = new Array();
    month_1[0] = "Jan";
    month_1[1] = "Feb";
    month_1[2] = "Mar";
    month_1[3] = "Apr";
    month_1[4] = "May";
    month_1[5] = "Jun";
    month_1[6] = "Jul";
    month_1[7] = "Aug";
    month_1[8] = "Sep";
    month_1[9] = "Oct";
    month_1[10] = "Nov";
    month_1[11] = "Dec";
    
    var timeValue = "";
    timeValue += ((date < 10) ? "0" : "") + date ;
    
    timeValue += ((month < 10) ? " " : " ") + month_1[month-1] ;
    timeValue += " "+year;
    
    timeValue += " ";
    if (hours == 0)
        timeValue    += (12)
    else
        timeValue    += ((hours > 12) ? hours - 12 : hours)
    timeValue    += ((minutes < 10) ? ":0" : ":") + minutes
    timeValue    += ((seconds < 10) ? ":0" : ":") + seconds
    timeValue    += (hours >= 12) ? " P.M." : " A.M."
    
    document.getElementById('timeclock').innerHTML = timeValue;
    __sec++;
    timerID = setTimeout("showtime("+index+")",1000);
}
function GetPCTime(i)
{
    var now = new Date();        
    document.forms[i].s_year.value = now.getFullYear(); 
    document.forms[i].s_month.value = now.getMonth()+1;
    document.forms[i].s_date.value = now.getDate();
    document.forms[i].s_hour.value = now.getHours();
    document.forms[i].s_min.value = now.getMinutes();
    document.forms[i].s_sec.value = now.getSeconds();
}
function loadurl(url)
{
    redir.action = "/" + url;
    redir.ReplySuccessPage.value = url;
    redir.ReplyErrorPage.value = url;
    javascript:redir.submit();
}
function Copyright(from)
{
     myDate = new Date();
     myYear = myDate.getFullYear();
     if (myYear <= from)
        document.write(from);
     else {
        document.write(from);
        document.write(" - ");
        document.write(myYear);
     }
}
function disable(eid)
{
    if (document.getElementById(eid) == null) return;
        document.getElementById(eid).disabled=true;
}
function enable(eid)
{
    if (document.getElementById(eid) == null) return;
        document.getElementById(eid).disabled=false;
}
function disable_box(eid)
{
    for (i=0;i<eid.getElementsByTagName("input").length;i++) {
        eid.getElementsByTagName("input")[i].disabled = true;        
    }
    for (i=0;i<eid.getElementsByTagName("select").length;i++) {
        eid.getElementsByTagName("select")[i].disabled = true;        
    }
}
function enable_box(eid)
{
    for (i=0;i<eid.getElementsByTagName("input").length;i++) {
        eid.getElementsByTagName("input")[i].disabled = false;        
    }
    for (i=0;i<eid.getElementsByTagName("select").length;i++) {
        eid.getElementsByTagName("select")[i].disabled = false;            
    }
    
}
function show(eid) 
{
    if (document.getElementById(eid) == null) return;
         document.getElementById(eid).style.display = '';    
}
function hide(eid) 
{
    if (document.getElementById(eid) == null) return;
         document.getElementById(eid).style.display = 'none';
}
function date_check(time_str)
{
    var mt = time_str.match(/^(\d{1,4})\-(\d{1,2})\-(\d{1,2})$/);
    if (!mt || mt[1] < 0 && mt[2] < 0 && mt[3] < 0)
        return 1;
    if (!mt || mt[1] < 2010 || mt[2] > 12 || mt[3] > 31)
        return 1;
    else {
        var ndate;
        var end_day;
        var year = mt[1];
        var month = mt[2];
        var day = mt[3];
         
        if (month == 2) { 
            if ((year % 400) == 0)
                end_day = 29;
            else {
                if ((year % 100) == 0)
                    end_day = 28;
                else {
                    if ((year % 4) == 0)
                        end_day = 29;
                    else
                        end_day = 28;
                }
            }
        }
        else {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                end_day = 31;
            else
                end_day = 30;
        }
        if (day > end_day)
            return 1;
        ndate = parseInt(mt[1],10);
        if (mt[2] >= 10)
            ndate = ndate+"-"+parseInt(mt[2],10);
        else
            ndate = ndate+"-0"+parseInt(mt[2],10);
        if (mt[3] >= 10)
            ndate = ndate+"-"+parseInt(mt[3],10);
        else
            ndate = ndate+"-0"+parseInt(mt[3],10);
        return ndate;
    }
}
function time_check(time_str)
{
    var mt = time_str.match(/^(\d{1,2})\:(\d{1,2})\:(\d{1,2})$/);
    if (!mt || mt[1] < 0 && mt[2] < 0 && mt[3] < 0)
        return 1;
    if (!mt || mt[1] > 23 || mt[2] > 59 || mt[3] > 59)
        return 1;
    else {
        var ntime;
        if (mt[1] >= 10)
            ntime = parseInt(mt[1],10);
        else
            ntime = "0"+parseInt(mt[1],10);
        if (mt[2] >= 10)
            ntime = ntime+":"+parseInt(mt[2],10);
        else
            ntime = ntime+":0"+parseInt(mt[2],10);
        if (mt[3] >= 10)
            ntime = ntime+":"+parseInt(mt[3],10);
        else
            ntime = ntime+":0"+parseInt(mt[3],10);
        return ntime;
    }
}
function daynight_check(time_str)
{
    var mt = time_str.match(/^(\d{1,2})\:(\d{1,2})$/);
    if (!mt || mt[1] < 0 && mt[2] < 0)
        return 1;
    if (!mt || mt[1] > 24 || mt[2] > 59)
        return 1;
    if (!mt || (mt[1] == 24 && mt[2] > 0))
        return 1;
    else {
        var ntime;
        if (mt[1] >= 10)
            ntime = parseInt(mt[1],10);
        else
            ntime = "0"+parseInt(mt[1],10);
        if (mt[2] >= 10)
            ntime = ntime+":"+parseInt(mt[2],10);
        else
            ntime = ntime+":0"+parseInt(mt[2],10);
        return ntime;
    }
}
function period_check(time_start,time_end)
{
    var mt, min_start, min_end;
    
    mt = time_start.match(/^(\d{1,2})\:(\d{1,2})$/);
    min_start = parseInt(mt[1],10) * 60 + parseInt(mt[2],10);
    mt = time_end.match(/^(\d{1,2})\:(\d{1,2})$/);
    min_end = parseInt(mt[1],10) * 60 + parseInt(mt[2],10);
    
    if (min_start > min_end)
        return 1;
    else
        return 0;
}
function daynightperiod_check(sid,eid)
{
    startid = document.getElementById(sid);
    endid = document.getElementById(eid);
    if (daynight_check(startid.value) == 1)
        return 1;
    if (daynight_check(endid.value) == 1)
        return 2;
    startid.value = daynight_check(startid.value);
    endid.value = daynight_check(endid.value);
    if (period_check(startid.value,endid.value) == 1)
        return 3;
    return 0;
}
function devip_check(ip_str)
{
    var mt = ip_str.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!mt || mt[1] >= 255 && mt[2] >= 255 && mt[3] >= 255 && mt[4] >= 255)
        return 1;
    if (!mt || mt[1] <= 0 && mt[2] <= 0 && mt[3] <= 0 && mt[4] <= 0)
        return 1;
    if (!mt || mt[1] == 255 && mt[2] == 255 && mt[3] == 255 && mt[4] == 255)
        return 1;
    if (!mt || mt[1] == 255 && mt[2] == 255 && mt[3] == 255 && mt[4] == 0)
        return 1;
    if (!mt || mt[1] == 255 && mt[2] == 255 && mt[3] == 0 && mt[4] == 0)
        return 1;
    if (!mt || mt[1] == 255 && mt[2] == 0 && mt[3] == 0 && mt[4] == 0)
        return 1;
    if (!mt || mt[1] < 1 || mt[1] > 223 || mt[1] == 0 || mt[1] == 127)
        return 1;
    if (!mt || mt[1] > 255 || mt[2] > 255 || mt[3] > 255 || mt[4] > 255)
        return 1;
    else
        return parseInt(mt[1],10)+ "."+parseInt(mt[2],10)+"."+parseInt(mt[3],10)+"."+parseInt(mt[4],10);
}
function ip_check(ip_str)
{
    var mt = ip_str.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!mt || mt[1] >= 255 && mt[2] >= 255 && mt[3] >= 255 && mt[4] >= 255)
        return 1;
    if (!mt || mt[1] <= 0 && mt[2] <= 0 && mt[3] <= 0 && mt[4] <= 0)
        return 1;
    if (!mt || mt[1] > 255 || mt[2] > 255 || mt[3] > 255 || mt[4] > 255)
        return 1;
    else
        return parseInt(mt[1],10)+ "."+parseInt(mt[2],10)+"."+parseInt(mt[3],10)+"."+parseInt(mt[4],10);
}
function ip_same_net(ip,netmask,gateway)
{
    var mt1 = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    var mt2 = netmask.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    var mt3 = gateway.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    
    if (((mt1[1]&mt2[1]) == (mt2[1]&mt3[1])) && ((mt1[2]&mt2[2]) == (mt2[2]&mt3[2])) && ((mt1[3]&mt2[3]) == (mt2[3]&mt3[3])) && ((mt1[4]&mt2[4]) == (mt2[4]&mt3[4])))
        return 0;
    else
        return 1;
}
function check_mask(ip,netmask)
{
    var mt1 = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    var mt2 = netmask.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    var chk1=255-mt2[1],chk2=255-mt2[2],chk3=255-mt2[3],chk4=255-mt2[4];
    
    if (((mt1[1]&chk1) == 0) && ((mt1[2]&chk2) == 0) && ((mt1[3]&chk3) == 0) && ((mt1[4]&chk4) == 0))
        return 1;
    if (((mt1[1]&chk1) == chk1) && ((mt1[2]&chk2) == chk2) && ((mt1[3]&chk3) == chk3) && ((mt1[4]&chk4) == chk4))
        return 1;
    return 0;
}
function checkIntRange(i,max,min)
{
    var mt = i.match(/[^0-9]/);
    if (mt)
        return 1;
    if ((isNaN(i)) || (i>max) || (i<min))
        return 1;
    if (parseInt(i) != i)
        return 1;
    return 0;
}
function checkHttpPort(i)
{
    /* FTP SRV(20,21), Telnet(23), Production Testing(8481) */
    if ((i == 20) || (i == 21) || (i == 23) || (i == 8481) || (i == 443))
        return 1;
    return 0;
}
function CheckHex(str)
{
    var mt = str.match(/[^a-fA-F0-9]/);
    if (mt)
        return 1;
    else 
        return 0;
}
function CheckBonjourname(str)
{
    var mt = str.match(/[^a-zA-Z0-9-]/);
    if ((str == "") || (mt))
        return 1;
    else
        return 0;
}
function CheckSrvname(str)
{
    if (str == "")
        return 1;
    else {
        for (i=0;i<str.length;i++) {
            j = str.charCodeAt(i);
            if ((j < 33) || (j == 34) || (j == 38) || (j == 39) || (j == 60) || (j == 62) || (j > 126))
                return 1;
        }
        return 0;
    }
}
function CheckUsername(str)
{
    var mt = str.match(/[^a-zA-Z0-9._-]/);
    if ((str == "") || (mt))
        return 1;
    else 
        return 0;
}
function CheckCMSDAdminpass(str)
{
    var mt = str.match(/[^a-zA-Z0-9]/);
    if ((str.length < 6) || (str.length > 30) || (mt))
        return 1;
    else 
        return 0;
}
function CheckUserpass(str)
{
    for (i=0;i<str.length;i++) {
        j = str.charCodeAt(i);
        if ((j < 33) || (j == 47) || (j == 58) || (j > 126))
            return 1;
    }
    return 0;
}
function CheckWPAKey(Key)
{
    if ((Key.length < 8) || (Key.length > 64))
        return 1;
    if (Key.length == 64) {
        if (CheckHex(Key) == 1)
            return 1;
        else
            return 0;
    }
    return 0;
}
function filename_check(str)
{
    var mt = str.match(/[^a-zA-Z0-9_-]/);
    if (mt)
        return 1;
    else
        return 0;
}
function basefilename_check(str)
{
    var mt = str.match(/[^a-zA-Z0-9_-]/);
    if (str.length <= 0)
        return 1;
    if (mt)
        return 1;
    else
        return 0;
}
function convert_space(str, spacestr)
{
    var i,j,retval="";

    for (i=0;i<str.length;i++) {
        j = str.charCodeAt(i);
        if (j == 0x20)
            retval = retval + spacestr;
        else
            retval = retval + str.charAt(i);
    }
    return retval;
}
function presetname_space(str)
{
    var i,j,retval=1;
    for (i=0;i<str.length;i++) {
        j = str.charCodeAt(i);
        if (j != 0x20) {
            retval = 0;
            break;
        }
    }
    return retval;
}
function presetname_check(str)
{
    var mt = str.match(/[^a-zA-Z0-9_-]/);
    if (str.length <= 0)
        return 1;
    if (mt)
        return 1;
    else
        return 0;
}
function getHEXString(instr)
{
     var hex_tab = "0123456789ABCDEF";
     var outstr = "";
     var i,j;

     for (i=0;i<instr.length;i++) {
        j = instr.charCodeAt(i);
        k = (j&0xf0)>> 4;
        outstr += hex_tab.charAt(k);
        l = (j&0x0f);
        outstr += hex_tab.charAt(l);
     }
     return outstr;
}
function getHexValue(val)
{
    if ((val >= 48) && (val <= 57))
    	val = val - 48;
    else
        val = val - 55;
    return val;
}
function getStringFromHex(instr)
{
     var outstr = "";
     var i,j;
	 var str = instr.toUpperCase();
     for (i=0;i<instr.length;i++) {
        j = getHexValue(str.charCodeAt(i++));
        k = getHexValue(str.charCodeAt(i));
        outstr += String.fromCharCode(j*16+k);
     }
     return outstr;
}
function getUnicodeStringFromHex(instr)
{
     var outstr = "";
     var i,j;
	 var str = instr.toUpperCase();
     for (i=0;i<str.length;i++) {
        j = getHexValue(str.charCodeAt(i++));
        k = getHexValue(str.charCodeAt(i));
        val = j*16+k;

		if ((val & 240) == 240) {			// 0xF0
        	i++
        	j = getHexValue(str.charCodeAt(i++));
        	k = getHexValue(str.charCodeAt(i));
        	val2 = j*16+k;
        	i++
        	j = getHexValue(str.charCodeAt(i++));
        	k = getHexValue(str.charCodeAt(i));
        	val3 = j*16+k;
        	i++
        	j = getHexValue(str.charCodeAt(i++));
        	k = getHexValue(str.charCodeAt(i));
        	val4 = j*16+k;
			value = ((val & 7) << 18) + ((val2 & 48) << 12) + ((val2 & 15) << 12) + ((val3 & 60) << 6) + ((val3 & 3) << 6) + (val4 & 63)
		} else if ((val & 224) == 224) {	// 0xE0
        	i++
        	j = getHexValue(str.charCodeAt(i++));
        	k = getHexValue(str.charCodeAt(i));
        	val2 = j*16+k;
        	i++
        	j = getHexValue(str.charCodeAt(i++));
        	k = getHexValue(str.charCodeAt(i));
        	val3 = j*16+k;
			value = ((val & 15) << 12) + ((val2 & 60) << 6) + ((val2 & 3) << 6) + (val3 & 63)
		} else if ((val & 192) == 192) {	// 0xC0
        	i++
        	j = getHexValue(str.charCodeAt(i++));
        	k = getHexValue(str.charCodeAt(i));
        	val2 = j*16+k;
			value = ((val & 28) << 6) + ((val & 3) << 6) + (val2 & 63)
		} else value = j*16+k;
        outstr += String.fromCharCode(value);
     }
     return outstr;
}
function getHTMLString(instr)
{
     var outstr = "";
     var i,j;

     for (i=0;i<instr.length;i++) {
        j = instr.charAt(i);
        if (j == ' ')
                 outstr += "&nbsp;";
        else if (j == '"')
                 outstr += "&quot;";
        else if (j == '&')
                 outstr += "&amp;";
        else if (j == '<')
                 outstr += "&lt;";
        else if (j == '>')
                 outstr += "&gt;";
        else
                 outstr += j;
     }
     return outstr;
}
function clickScheduleEnable(vid,cid)
{
    valueid = document.getElementById(vid);
    checkid = document.getElementById(cid);
    if (checkid.checked)
        valueid.value = 1;
    else
        valueid.value = 0;
}
function clickScheduleDay(vid,cid,bit)
{
    valueid = document.getElementById(vid);
    checkid = document.getElementById(cid);
    check = 0x01 << (bit);
    value = parseInt(valueid.value,10);
    if (checkid.checked)
        value |= check;
    else
        value ^= (check);
    valueid.value = value.toString();
}
function CheckShortfilename(str)
{
    if ((str.length > 12) || (str.length <= 0))
        return 1;
    x = y = z = 0;
    for (i=0;i<str.length;i++) {
        j = str.charCodeAt(i);
        if (j == 46) {
            z++;
            continue;
        }
        if (z == 0)
            x++;
        else
            y++;
    }
    if ((x <= 0) || (x > 8) || (y >3) || (z > 1))
        return 1;
    return 0;
}
function string2hex(input)
{
    var hex_tab = "0123456789ABCDEF";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
                 +    hex_tab.charAt( x        & 0x0F);
    }
    return output;
}
function stringtoarray(input)
{
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
    return output;
}
function arraytostring(input)
{
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
    return output;
}
function array_md5(x, len)
{
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a =    1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =    271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,    606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,    1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,    1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,    1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,    1236535329);

        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,    643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,    38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,    568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,    1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,    1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,    1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,    1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,    681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,    76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,    530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,    1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,    1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,    1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,    1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,    718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t)
{
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function safe_add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}
function hmac_md5(key, data)
{
    var bkey = stringtoarray(key);
    if (bkey.length > 16) bkey = array_md5(bkey, key.length * 8);
    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    var hash = array_md5(ipad.concat(stringtoarray(data)), 512 + data.length * 8);
    return string2hex(arraytostring(array_md5(opad.concat(hash), 512 + 128)));
}
function AES_Init()
{
    AES_Sbox_Inv = new Array(256);
    for (var i = 0; i < 256; i++)
        AES_Sbox_Inv[AES_Sbox[i]] = i;
    AES_ShiftRowTab_Inv = new Array(16);
    for (var i = 0; i < 16; i++)
        AES_ShiftRowTab_Inv[AES_ShiftRowTab[i]] = i;
    AES_xtime = new Array(256);
    for (var i = 0; i < 128; i++) {
        AES_xtime[i] = i << 1;
        AES_xtime[128 + i] = (i << 1) ^ 0x1b;
    }
}
function AES_Done()
{
    delete AES_Sbox_Inv;
    delete AES_ShiftRowTab_Inv;
    delete AES_xtime;
}
function AES_Encrypt(block, key)
{
    var l = key.length;
    AES_AddRoundKey(block, key.slice(0, 16));
    for (var i = 16; i < l - 16; i += 16) {
        AES_SubBytes(block, AES_Sbox);
        AES_ShiftRows(block, AES_ShiftRowTab);
        AES_MixColumns(block);
        AES_AddRoundKey(block, key.slice(i, i + 16));
    }
    AES_SubBytes(block, AES_Sbox);
    AES_ShiftRows(block, AES_ShiftRowTab);
    AES_AddRoundKey(block, key.slice(i, l));
    return block;
}
function AES_Decrypt(block, key)
{
    var l = key.length;
    AES_AddRoundKey(block, key.slice(l - 16, l));
    AES_ShiftRows(block, AES_ShiftRowTab_Inv);
    AES_SubBytes(block, AES_Sbox_Inv);
    for (var i = l - 32; i >= 16; i -= 16) {
        AES_AddRoundKey(block, key.slice(i, i + 16));
        AES_MixColumns_Inv(block);
        AES_ShiftRows(block, AES_ShiftRowTab_Inv);
        AES_SubBytes(block, AES_Sbox_Inv);
    }
    AES_AddRoundKey(block, key.slice(0, 16));
    return block;
}
AES_Sbox = new Array(99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,
    118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,
    147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,
    7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,
    47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,
    251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,
    188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,
    100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,
    50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,
    78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,
    116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,
    158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,
    137,13,191,230,66,104,65,153,45,15,176,84,187,22);
AES_ShiftRowTab = new Array(0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11);
function AES_SubBytes(state, sbox)
{
    for (var i = 0; i < 16; i++)
        state[i] = sbox[state[i]];
}
function AES_AddRoundKey(state, rkey)
{
    for (var i = 0; i < 16; i++)
        state[i] ^= rkey[i];
}
function AES_ShiftRows(state, shifttab)
{
    var h = new Array().concat(state);
    for (var i = 0; i < 16; i++)
        state[i] = h[shifttab[i]];
}
function AES_MixColumns(state) {
    for (var i = 0; i < 16; i += 4) {
        var s0 = state[i + 0], s1 = state[i + 1];
        var s2 = state[i + 2], s3 = state[i + 3];
        var h = s0 ^ s1 ^ s2 ^ s3;
        state[i + 0] ^= h ^ AES_xtime[s0 ^ s1];
        state[i + 1] ^= h ^ AES_xtime[s1 ^ s2];
        state[i + 2] ^= h ^ AES_xtime[s2 ^ s3];
        state[i + 3] ^= h ^ AES_xtime[s3 ^ s0];
    }
}
function AES_MixColumns_Inv(state)
{
    for (var i = 0; i < 16; i += 4) {
        var s0 = state[i + 0], s1 = state[i + 1];
        var s2 = state[i + 2], s3 = state[i + 3];
        var h = s0 ^ s1 ^ s2 ^ s3;
        var xh = AES_xtime[h];
        var h1 = AES_xtime[AES_xtime[xh ^ s0 ^ s2]] ^ h;
        var h2 = AES_xtime[AES_xtime[xh ^ s1 ^ s3]] ^ h;
        state[i + 0] ^= h1 ^ AES_xtime[s0 ^ s1];
        state[i + 1] ^= h2 ^ AES_xtime[s1 ^ s2];
        state[i + 2] ^= h1 ^ AES_xtime[s2 ^ s3];
        state[i + 3] ^= h2 ^ AES_xtime[s3 ^ s0];
    }
}
function hexstr2array(input, length)
{
    var output = new Array(length);
    var i=0;
    for (i=0; i<length; i++) {
        if (i < input.length/2)
            output[i] = parseInt(input.substr(i*2,2),16);
        else
            output[i] = 0;
    }
    return output;
}
function str2hexstr(input)
{
    var output="";
    for (var a = 0; a < input.length; a = a + 1) {
        output = output + input.charCodeAt(a).toString(16);
    }
    return output;
}
function array2hexstr(input)
{
    var len=input.length;
    var output="";
    for (var i=0; i< len; i++) {
        var tmp=input[i].toString(16);
        if (tmp.length == 1) tmp = "0" + tmp;
        output = output + tmp;
    }
    return output;
}
function hexstr2str(input)
{
    var output="";
    for (var i=0; i < input.length; i=i+2) {
        var hexstr = input.substr(i, 2);
        if (hexstr=="00") break;
        else output = output + String.fromCharCode(parseInt(hexstr, 16));
    }
    return output;
}
function AES_Encrypt128(passwd,PrivateKey)
{
    var private_key_byte = hexstr2array(PrivateKey, 32);
    var passwd_byte = hexstr2array(passwd, 64);
    var output="";
    var output_byte = new Array(64);
    AES_Init();
    for (var i=0; i<4; i++) {
        var block = new Array(16);
        for (var j=0; j<16; j++)
            block[j] = passwd_byte[i*16+j];
        block = AES_Encrypt(block,private_key_byte);
        for (var j=0; j<16; j++)
            output_byte[i*16+j] = block[j];
    }
    output = array2hexstr(output_byte);
    AES_Done();
    return output;
}
function AES_Decrypt128(encrypted,PrivateKey)
{
    var private_key_byte = hexstr2array(PrivateKey, 32);
    var encrypted_byte = hexstr2array(encrypted, 64);
    var output="";
    var output_byte = new Array(64);
    AES_Init();
    for (var i=0; i<4; i++) {
        var block = new Array(16);
        for (var j=0; j<16; j++)
            block[j] = encrypted_byte[i*16+j];
        block = AES_Decrypt(block,private_key_byte);
        for (var j=0; j<16; j++)
            output_byte[i*16+j] = block[j];
    }
    output = array2hexstr(output_byte);
    AES_Done();
    return output;
}
function EncryptPass(input, privatekey)
{
    var input_hex = str2hexstr(input);
    var privatekey_hex = str2hexstr(privatekey);
    var encrypted = AES_Encrypt128(input_hex, privatekey_hex);
    return encrypted;
}
function DecryptPass(encrypted, privatekey)
{
    var privatekey_hex = str2hexstr(privatekey);
    var decrypted = AES_Decrypt128(encrypted, privatekey_hex);
    var decrypted_ascii = hexstr2str(decrypted);
    return decrypted_ascii;
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str)
{
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
 	    c1 = str.charCodeAt(i++) & 0xff;
 	    if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars .charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function base64decode(str)
{
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while( i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if (c1 == -1) break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if (c2 == -1) break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while(i < len && c3 == -1);
        if (c3 == -1) break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while(i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
