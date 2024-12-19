# TalentHaven

![image](https://github.com/user-attachments/assets/221330fa-0041-461e-af56-dbf68e6afb7a)

## Case Study
Shape the Future of Digital Interaction: Building the Student-Company Platform.

## Summary
We at Talent Haven have built an MVP of a digital platform, that connects students with research topics and working student positions at Deutsche Telekom IT, thus bridging the gap between academic research and practical application.

## 1. Overview
Simple Software Architecture
![image](https://github.com/user-attachments/assets/f9928a29-05a0-473b-a752-3ceef0aa3f51)

Basically, we have in total 5 Azure cloud services:
2 Azure static web app (swa), 1 azure active directory AAD (Microsoft Entra ID), 1 AAD B2C and one database DB.
1. One Azure SWA was used to host the application that the admin interacts with. The admin logs in with the microsoft entra id and adds new research topics and working student positions, which is saved in the database.
2. The second Azure SWA was used to host the application that other users interacts with. The users can register or login with AD B2C and once authenticated can see the opportunities posted by the admin.
3. AAD Microsoft Entra ID: Identity solution for authenticating admins. 
4. AAD B2C: Identity solution for authenticating other users. 
5. DB: Store information about positions and research topics

## 2. Technologies
1. In the frontend, we relied on React with Typescript. 
2. To communicate with the database, we relied on the azure functions capability available in Azure SWA. Inside the folders, there is an api folder, which we used to communicate with the database. 
3. To host the applications, we used the free version of Azure SWA to host both SWA applications. The hosting of the other services (AAD, B2C and DB) was also done with Azure. 
