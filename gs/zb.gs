* * draw the frame stick of mproj latlon mygs * 
function fram(arg) 
if(arg='') 
  say 'Usage: fram longitude-interval latitude-interval stick-length' 
  say 'stick-length>0 [<0], sticks will draw inside [outside] of frame' 
endif 
** Is anything displaied 
'q gxinfo' 
lin1=sublin(result,1);wrd4=subwrd(lin1,4) 
if(wrd4 = 'clear' | wrd4='Clear') 
  say 'fram.gs should run after display' 
  return 
endif 
incrx=subwrd(arg,1) 
incry=subwrd(arg,2) 
siz=subwrd(arg,3) 
if(incrx='');incrx=5;endif 
if(incry='');incry=5;endif 
if(siz='');siz=0.1;endif 
say 'Drawing the sticks of the mproj latlon'
say 'incr lon = '%incrx%' incr lat = '%incry%' length = '%siz 
if(siz>0) 
  say 'sticks will draw inside the frame' 
else 
  say 'sticks will draw outside the frame' 
endif 
** get 4 corners' location 
'q dims' 
lin2=sublin(result,2) 
lin3=sublin(result,3) 
lon1=subwrd(lin2,6) 
lon2=subwrd(lin2,8) 
lat1=subwrd(lin3,6) 
lat2=subwrd(lin3,8) 
'q w2xy '%lon1%' '%lat1 
xbl=subwrd(result,3) 
ybl=subwrd(result,6) 
xtl=xbl 
ybr=ybl 
'q w2xy '%lon2%' '%lat2 
xtr=subwrd(result,3) 
ytr=subwrd(result,6) 
xbr=xtr 
ytl=ytr 
** space of 1 Degree 
dx=(xbr-xbl)/(lon2-lon1) 
dy=(ytl-ybl)/(lat2-lat1) 
** sticks east-west direction 
'set line 1 1 3'
lint(lon1) 
if(_int=1);n=lon1;else;n=-360;endif 
while(n<=lon2) 
if(n>=lon1) 
  xx=n/incrx;lint(xx) 
  if(_int = 1) 
    xb=xbl+(n-lon1)*dx 
    'draw line '%xb%' '%ybl%' '%xb%' 'ybl+siz 
    'draw line '%xb%' '%ytl%' '%xb%' 'ytl-siz 
  endif 
endif 
n=n+1 
endwhile 
** sticks south-north direction 
n=lat1 
lint(lat1) 
if(_int=1);n=lat1;else;n=-90;endif 
while(n<=lat2) 
if(n>=lat1)
  xx=n/incry;lint(xx) 
  if(_int=1)
    yl=ybl+(n-lat1)*dy 
    'draw line '%xbl%' '%yl%' '%xbl+siz%' 'yl 
    'draw line '%xbr%' '%yl%' '%xbr-siz%' 'yl 
  endif 
endif 
n=n+1 
endwhile 
***************************************************** 
* to identify if a number is an integer. 
* _int=1,yes; _int=0,not. 
***************************************************** 
function lint(arg) 
wrd=subwrd(arg,1) 
n=1;_int=1 
while(1) 
ch=substr(wrd,n,1) 
*if(ch='.' | ch='E' | ch='e')是不行的，对尾数为0的整数可能包括e/E 
if(ch='.') 
  _int=0 
  break 
endif 
if(ch='');break;endif 
n=n+1 
endwhile 
return 
* 
*Note if one will draw a really small region 
*Change n=n+1 in the main function to n=n+sm (sm=0.5,0.25, etc) 
* sticks color,style, and thickness are set by "set line" 
* :em11: