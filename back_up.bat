cd "c:\Program Files\7-zip"

set ROUTE= "%HOMEPATH%\documents\github\my_sites\"

for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set dow=%%
     set month=%%j
     set day=%%i
     set year=%%k
)
set datestr=%day%_%month%_%year%

7z a -mx=9 -tzip %ROUTE%\backup\%datestr%\%datestr%_admin_angular.zip %ROUTE%\blowedmindsAdminA4.2\src %ROUTE%\blowedmindsAdminA4.2\e2e %ROUTE%\blowedmindsAdminA4.2\angular-cli.json %ROUTE%\blowedmindsAdminA4.2\back_up.bat %ROUTE%\blowedmindsAdminA4.2\karma.conf.js %ROUTE%\blowedmindsAdminA4.2\ng_build.bat %ROUTE%\blowedmindsAdminA4.2\ng_serve.bat %ROUTE%\blowedmindsAdminA4.2\package.json %ROUTE%\blowedmindsAdminA4.2\protractor.conf.json %ROUTE%\blowedmindsAdminA4.2\tsconfig.json %ROUTE%\blowedmindsAdminA4.2\tslint.json
