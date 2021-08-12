'reinit'
'sdfopen F:\Data\Original\nc\uwnd.mon.mean.nc'
'set gxout fwrite'
'set fwrite F:\Data\Processed\wnd\200uwnd1948-2014.dat'
'set x 1 144'
'set y 1 73'
'set lev 200'
'set t 1 812'
'd uwnd'
*zz=1
*while(zz<18)
*'set z'zz 
* 'd uwnd'
* zz=zz+1
*endwhile
'disable fwrite'
'reinit'
;