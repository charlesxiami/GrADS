 function main()
'reinit'
'open anomaly_band_WACCM.ctl'
'enable print section.met'
'../colormap_BYR.gs'
'set xlopts 1 -1 0.2'
'set ylopts 1 -1 0.2'
i = 1
while(i<=2)
'set time feb1850 dec2005'
'set lat -90 90'
'set lev 30' 
'set t 1 1872'
'set lon 0 360'
if(i=1)
'define tta = ave(ta, lev=70, lev=20)'
else
'define tta = ave(ua, lev=70, lev=20)'
endif
** El Nino in the same winters **
'set parea 2 9 4.5 8'
'set time feb1858'
'define t1 = ave(tta,time=dec1852,time=feb1853)'
'define t2 = ave(tta,time=dec1854,time=feb1855)'
'define t3 = ave(tta,time=dec1861,time=feb1862)'
'define t4 = ave(tta,time=dec1887,time=feb1888)'
'define t5 = ave(tta,time=dec1932,time=feb1933)'
'define t6 = ave(tta,time=dec1953,time=feb1954)'
'define t7 = ave(tta,time=dec1959,time=feb1960)'
'define t8 = ave(tta,time=dec1969,time=feb1970)'
'define t9 = ave(tta,time=dec1978,time=feb1979)'
'define t10 = ave(tta,time=dec1987,time=feb1988)'
'define tave = (t1+t2+t3+t4+t5+t6+t7+t8+t9+t10)/10'
'define ss = pow(t1-tave,2)+pow(t2-tave,2)+pow(t3-tave,2)+pow(t4-tave,2)'
'define ss = pow(t5-tave,2)+pow(t6-tave,2)+pow(t7-tave,2)+pow(t8-tave,2)+ss'
'define ss = pow(t9-tave,2)+pow(t10-tave,2)+ss'
'ss = ss/10'
'define test=tave/sqrt(ss)*sqrt(10)'

'set lon 0 360'
'set lev 30'
'set lat -30 90'
'set ylevs -30 0 30 60 90'
'set grads off'
'set zlog on'
'set gxout shaded'
*'set clevs -2.26 2.26'
*'set ccols 32 0 32'
*'d test'
* we did not use shaded gxout for t-test anymore, so
* .....
*******************************************
*stippling for significant test
*** must be 2-D, XY ****
'myp=maskout(test,test*test-2.26*2.26)'
*** or 
'myp=maskout(test,abs(test)-2.26)'
'set gxout shp'
'set shp -pt shppt'
'd myp'
******************************************
'set gxout shaded'
'set clevs -3 -2.5 -2 -1.5 -1 -0.5 0.5 1 1.5 2 2.5 3'
'set ccols 28 31 34 37 40 43 0 54 57 60 63 65 68'
'd tave'
'set gxout contour'
'set ccolor 1'
'set cthick 6'
'set clab forced'
'd tave'

'set line 32'
'set shpopts -1 5 0.02'
'draw shp shppt' 
'draw map'

if(i=1)
'draw title composited temperature anomalies (DJF)'
else
'draw title composuted zonal wind anomalies (DJF)'
endif

***
** El Nino in the next winters **
'set parea 2 9 0.5 4'
'set time feb1858'
'define t1 = ave(tta,time=dec1853,time=feb1854)'
'define t2 = ave(tta,time=dec1855,time=feb1856)'
'define t3 = ave(tta,time=dec1862,time=feb1863)'
'define t4 = ave(tta,time=dec1888,time=feb1889)'
'define t5 = ave(tta,time=dec1933,time=feb1934)'
'define t6 = ave(tta,time=dec1954,time=feb1955)'
'define t7 = ave(tta,time=dec1960,time=feb1961)'
'define t8 = ave(tta,time=dec1970,time=feb1971)'
'define t9 = ave(tta,time=dec1979,time=feb1980)'
'define t10 = ave(tta,time=dec1988,time=feb1989)'
'define tave = (t1+t2+t3+t4+t5+t6+t7+t8+t9+t10)/10'
'define ss = pow(t1-tave,2)+pow(t2-tave,2)+pow(t3-tave,2)+pow(t4-tave,2)'
'define ss = pow(t5-tave,2)+pow(t6-tave,2)+pow(t7-tave,2)+pow(t8-tave,2)+ss'
'define ss = pow(t9-tave,2)+pow(t10-tave,2)+ss'
'ss = ss/10'
'define test = tave/sqrt(ss)*sqrt(10)'

'set x 1'
'set lev 30'
'set lon 0 360'
'set lat -30 90'
'set ylevs -30 0 30 60 90'
'set grads off'
'set gxout shaded'
*'set clevs -2.26 2.26'
*'set ccols 32 0 32'
*'d test'
********************************************
'myp=maskout(test,test*test-2.26*2.26)'
*** or 
'myp=maskout(test,abs(test)-2.26)'
'set gxout shp'
'set shp -pt shppt'
'd myp'
'set line 32'
*******************************************
'set gxout shaded'
'set clevs -3 -2.5 -2 -1.5 -1 -0.5 0.5 1 1.5 2 2.5 3'
'set ccols 28 31 34 37 40 43 0 54 57 60 63 65 68'
'd tave'
'set gxout contour'
'set ccolor 1'
'set cthick 6'
'set clab forced'
'd tave'

'set line 32'
'set shpopts -1 5 0.02'
'draw shp shppt'
'draw map'

if(i=1)
'draw title composited temperature anomalies (DJF+)'
else
'draw title composuted zonal wind anomalies (DJF+)'
endif


'print'
'c'
i=i+1
endwhile
'disable print'
 
'!gxps -b 0.10 -c -i section.met -o ttest.ps'