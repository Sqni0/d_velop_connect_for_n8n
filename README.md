# d.velop Actions Node - Documentation

# Table of Contents

- [Overview](#overview)
- [1. Purpose of this Node](#1-purpose-of-this-node)
  - [1.1 Typical Use-Cases](#11-typical-use-cases)
- [2. Prerequisites](#2-prerequisites)
  - [2.1 Required Access](#21-required-access)
  - [2.2 Required Information](#22-required-information)
- [3. Setting up the Credentials](#3-setting-up-the-credentials)
  - [3.1 Base URL](#31-base-url)
  - [3.2 Authentication Method](#32-authentication-method)
  - [3.3 Allowed HTTP Request](#33-allowed-http-request)
- [4. Use the Node in a Workflow](#4-use-the-node-in-a-workflow)
  - [4.1 Pick an Action Mode](#41-pick-an-action-mode)
  - [4.2 Stable Actions](#42-stable-actions)
  - [4.3 Volatile Actions](#43-volatile-actions)
- [5. Stable Actions in Detail](#5-stable-actions-in-detail)
  - [5.1 Download Document](#51-download-document)
  - [5.2 Get Document Info](#52-get-document-info)
  - [5.3 Get User Info](#53-get-user-info)



## Overview
- The main Goal of this Projekt is to create a geatway to hyperautomatisation with other Apps in the d.velop Hemesphere. And this Node Bassicly does all that. 

## 1. Purpouse of this Node
- This Node allows the d.velop DMS (Document Managment System) Users to implement their Document managment with the Middelware **n8n**
- You can Automize docoment Processing and implement all d.velop API functions in your workflow
- The Possibilities are imense, because n8n already ahs about 1300 nodes, to automize your workflow.

### 1.1 Typical Use-Cases
- Download documents automaticly
- Import documents automaticly to the DMS
- Call the Meta-Data from documents
- Call User Information
- This Node is compleaty intigrated in n8n and you can combine this Node with whatever other nodes as you need.

## 2.Prerequisits

**2.1 Required Acceess**
- d.velop DMS Instance
- Valid Login data
- Access to the d.velop Actions API

**2.2 Reqired Information**
- Base URL of the d.velop instance
- User / API Access
- Repository and or Document ID's


## 3.Setting up the Credentials
For ervery Action Node you want to execute you need to have your credentials setup, without them the API Wouldnt have the Required Information to execute calls

<img width="1312" height="746" alt="image" src="https://github.com/user-attachments/assets/fe0a35f7-6bc2-4837-a995-02426ab822e5" />

**3.1 Base URL**
- This is just the Base URL of you Instance, marked in the Blue (Dont Copy the last /)
  <img width="600" height="41" alt="image" src="https://github.com/user-attachments/assets/2e89a2b6-0387-4ab9-8891-3c4090b817f0" />

**3.2 Authentication Method**
- The Bearer Token is nothing else exept the API-Key you can find in the d.velop instance Konfigurations, under Login -> API-Key
- There you have to create an API-Key. Keep in mind that the key only Shows once, therefore you should save the key somwhere save. Also Keep this Key for you and do **NOT** hand it out.

**3.3 Allowed HTTP Request**
- For the node to work you need to Allow the HTTP Rquests.

## 4. Use the Node in a Workflow 
To Use this node in A Workflow you need to open **nodes panel** and search for *d.velop Actions*
 
**4.1. Pick a Action Mode**
- Here you can choose beetween 4 Stable Actions or your Volatile Actions.
<img width="564" height="356" alt="image" src="https://github.com/user-attachments/assets/1ec54de7-e1f5-4294-9212-d784db8ac2dd" />

 
 **4.2. Stable Actions**

Stable Actions are pre definded, and they will always be the same
They are the Standard Features such as:
 - Download a Document
 - Get Document Info
 - Get Uer Info
 - Import Document

**4.3. Volatile Actions**
- Volatile Actions arent Pre defined and differ from d.velop User to User. They are Actions that are not Hard coded and arent a Standard.
- Theese Actions can also be Created to the Proccess Studio script tab, and can be used in this Node.
As an example: 
<img width="431" height="272" alt="image" src="https://github.com/user-attachments/assets/1cdbbc41-5fc8-4e31-9fef-df1055f0b2ab" />

- Those are Standard Volatile Salesforce Actions, and the Hello_World Action is a script from the Process Studio.
- Theese Actions are Dynamic and the Payload that they Carry isn't dispalyed

## 5. Stable Actions in Detail
- This is going to showcase how the Stable Nodes work in detail


**5.1 Download Document**
- To setup the Download node manually, you just need to fill in the mandatory fields and you are ready to Download the file.

<img width="461" height="486" alt="image" src="https://github.com/user-attachments/assets/befacd4b-82ea-49f7-a901-d0096416a674" />

- To find out what the *Repository* string is, you need to open the Document you want to download via. the n8n node and copy the red Marked Link section.


- To identify the *Document ID* you can, open te Details and Look for Document_Nr. This is also circled with a rectangle


<img width="1226" height="708" alt="Download_Document" src="https://github.com/user-attachments/assets/ea17fb6d-8fae-4bc9-937d-825eb2a40349" />





- The output will be Display in the Rightside of the Node, you can also Download this File

<img width="660" height="353" alt="image" src="https://github.com/user-attachments/assets/22da756b-d62f-4be9-b69d-5524355a9068" />

**5.2. Get Document Info**
This action shows all the Information the Document has attached to it, for example:

- Document ID
- Document Location (URL)
- Self Link
- Delete Link
- Main content Link
- PDF Content Link
- Update Link
- Update with Content Link
- Versions Link
- LAs Modified Date
- Last Alteration Date
- Editor ID
- Editor Name
- Owner ID
- Owner Name
- Document CAption
- File Name
- File Type
- Fike MINE Type
- Document Number
- Creation Date
- File Size
- Document State
- Variant Number
- Last Access Date
- Document Categoty ID
- Documnet Category Name
- Retenition Date
- Custom Properties
- Source Categories

**5.2.1 Setting up the Action**

- To setup the Node manually, you just need to fill in the mandatory fields and you are ready to get the Document Info.

<img width="577" height="501" alt="image" src="https://github.com/user-attachments/assets/54410412-5425-4aeb-addf-82db00a9c6ce" />

- To find out what the *Repository* string is, you need to open the Document you want to get the Information from, via. the n8n node and copy the red Marked Link section.


- To identify the *Document ID* you can, open te Details and Look for Document_Nr. This is also circled with a rectangle


<img width="1226" height="708" alt="Download_Document" src="https://github.com/user-attachments/assets/ea17fb6d-8fae-4bc9-937d-825eb2a40349" />




- The output will be Display in the Rightside of the Node:

<img width="1401" height="878" alt="image" src="https://github.com/user-attachments/assets/360cf720-a709-47a9-a1ab-2b681ced2c20" />

- This is a lot of JSON, so the whole Output wont be shown.


**5.3. Get User Info**

This Actions shows all known Information, that is Attatched to the User. Theese are all the Functions that this Actions return:

- getUserId – Returns the unique internal user ID
- getExternalId – Returns the external user ID (if available)
- getUserName – Returns the user's login username
- getDisplayName – Returns the user's full display name
- getGivenName – Returns the user's first name
- getFamilyName – Returns the user's last name
- getFormattedName – Returns the user's formatted full name
- getPrimaryEmail – Returns the user's primary email address
- getEmails – Returns all email addresses of the user
- getProfileUrl – Returns the user's profile URL
- getUserTitle – Returns the user's job title or position
- getPhotos – Returns the user's profile photo information
- getPhoneNumbers – Returns the user's phone numbers
- getGroups – Returns all groups the user belongs to
- getGroupIds – Returns the IDs of the user's groups
- getGroupDisplayNames – Returns the names of the user's groups


**5.3.1 Setting up the Action**
- To set this Action up you just need the User_ID.

<img width="580" height="421" alt="image" src="https://github.com/user-attachments/assets/21f70d38-d286-4653-b31a-b240af5f15fc" />

- To Aquire the User_ID of a DMS User, you need to go in to the Configuration -> Administration -> User account and group management
- From there you just need to click the User you want the ID From, and Copy the red marked section from the URL

<img width="1047" height="781" alt="Screenshot 2026-02-19 110016" src="https://github.com/user-attachments/assets/ddb2a6bb-e8cd-48ec-ac35-dce8445d0b8a" />


The output will be Display in the Rightside of the Node:


<img width="1365" height="1142" alt="image" src="https://github.com/user-attachments/assets/6311374e-0825-42fd-bb55-cb9887a3128f" />

