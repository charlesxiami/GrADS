dset F:\Data\dat\uwnd.dat
title uwnd Data
*format yrev
options sequential
undef -9.99e33
xdef 144 linear 0 2.5
ydef 73 linear -90 2.5
zdef 17 levels 1000 925 850 700 600 500 400 300 250 200 150 100 70 50 30 20 10 
tdef 812 linear 00Z01JAN1948 1mo
vars 1
u 17 99 uwnd
endvars