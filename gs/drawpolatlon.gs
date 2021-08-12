*********************************
*This script drawing the coordinatess of the mproj-nps/sps 
*by CD 2014.01.10
*********************************
***judge the mproj whether is nps/sps
'q gxinfo'
ll=sublin(result,6)
ww=subwrd(ll,3)
if(ww!=3&ww!=4)
   say 'set mproj error and change it to nps/sps'    
   return
endif
    
'q dims'
line1=sublin(result,2)
line2=sublin(result,3)
wd11=subwrd(line1,6)
if(ww=3)
   wd22=subwrd(line2,6)
else
   wd22=subwrd(line2,8)   
endif
*******************************************
*caculate the string width
  'q string s'
  strwith=subwrd(result,4)
i=1
while(i<=12)
   wd1=wd11+30*(i-1)
   
   
*************************************************************   
**************************************************************
***for nps
if(ww=3)
if(i<=7)
     ra=(90-30*(i-1))/180*3.1415926
   else
      ra=(30*(i-1)-270)/180*3.1415926
endif
if(i<7&i>1)
  xoffset=1.5*strwith*math_cos(ra)+2*strwith
  yoffset=1.5*strwith*math_sin(ra)
endif
if(i=7|i=1)
  xoffset=1.5*strwith*math_cos(ra)
  yoffset=1.5*strwith*math_sin(ra)
endif
if(i>7&i<12)
  xoffset=1.5*strwith*math_cos(ra)+2*strwith
  yoffset=1.5*strwith*math_sin(ra)    
endif
**************************************************************
****for sps
else
if(i<=7)
     ra=(30*(i-1)-90)/180*3.1415926
   else
      ra=(270-30*(i-1))/180*3.1415926
endif
if(i<7&i>1)
  xoffset=1.5*strwith*math_cos(ra)+2*strwith
  yoffset=1.5*strwith*math_sin(ra)
endif
if(i=7|i=1)
  xoffset=1.5*strwith*math_cos(ra)
  yoffset=1.5*strwith*math_sin(ra)
endif
if(i>7&i<12)
  xoffset=1.5*strwith*math_cos(ra)+2*strwith
  yoffset=1.5*strwith*math_sin(ra)    
endif
endif
'q w2xy 'wd1' 'wd22''
if(i<7&i>1)
    ii=subwrd(result,3)-xoffset
    jj=subwrd(result,6)+yoffset
else
    ii=subwrd(result,3)+xoffset
    jj=subwrd(result,6)+yoffset  
endif

'set string 1 c '
*draw  the coordinate string 
if(wd1<0&wd1>-180)
   wd=(-1)*wd1
'draw string 'ii' 'jj' 'wd'`1W'
endif
*******************************************************
if(wd1<-180&wd1>-360)
    wd=wd1+360
'draw string 'ii' 'jj' 'wd'`1E'
endif
****************************************************
if(wd1>180&wd1<360)
    wd=360-wd1
'draw string 'ii' 'jj' 'wd'`1W'
endif
*****************************************************
if(wd1>0&wd1<180)
    wd=wd1
'draw string 'ii' 'jj' 'wd'`1E'
endif
*****************************************************
if(wd1=-180|wd1=180)
    wd=180
'draw string 'ii' 'jj' 'wd''
endif
******************************************************
if(wd1=0|wd1=-360|wd1=360)
    wd=0
'draw string 'ii' 'jj' 'wd''    
endif
i=i+1
endwhile

***************************************

