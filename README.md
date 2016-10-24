# Twitter App

=>	Initially I used “appbase” third party library to store user info and tweet, now it is totally through “localstorage” 
=>	I am running the application with web server extension for Chrome
=>	It us required to set default value as of now in local storage :
       Key : followInfo 
       Value : [{"followers":"demo","following":"demo1"}]
=> Currently I have 5 default users to test - demo,demo1,demo2,demo3,demo4 with password demo                                                                                                       

Known Issue : 
=> Tweets will not get refreshed automatically once you will hit tweet button
=> Need to set default value in local storage for "followInfo"  
=> We can comletely omit 'appbase' liberary
