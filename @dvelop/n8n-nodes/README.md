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
    - [5.2.1 Setting up the Action](#521-setting-up-the-action)
  - [5.3 Get User Info](#53-get-user-info)
    - [5.3.1 Setting up the Action](#531-setting-up-the-action)
  - [5.4 Import Document](#54-import-document)
    - [5.4.1 Setting up the Workflow](#541-setting-up-the-workflow)
    - [5.4.2 Setting up the Node](#542-setting-up-the-node)
    - [5.4.3 DMS Inbound](#543-dms-inbound)
- [6. Volatile Action in Detail](#6-volatile-action-in-detail)
  - [6.1 Choose from your Actions](#61-choose-from-your-actions)
  - [6.2 Payload of an Action](#62-payload-of-an-action)
  - [6.3 Assemble the Node](#63-assamble-the-node)
- [7. Error Codes](#7-error-codes)
  - [7.1 Authentication Errors](#71-authentication-errors)
  - [7.2 Document Errors](#72-document-errors)
  - [7.3 Import Errors](#73-import-errors)
  - [7.4 Volatile Action Errors](#74-volatile-action-errors)


---

## Overview

This project provides a gateway for hyperautomation by enabling seamless integration between the d.velop platform and external applications using n8n. The d.velop Actions Node allows users to execute d.velop Actions directly within n8n workflows, making it possible to automate document management, user operations, and custom process integrations. This enables powerful, flexible, and scalable automation across the entire d.velop ecosystem.


---

## 1. Purpose of this Node

- This node allows the d.velop DMS (Document Management System) users to implement their document management with the middleware **n8n**
- You can automate document processing and implement all d.velop API functions in your workflow
- The possibilities are immense, because n8n already has about 1300 nodes to automate your workflow.

### 1.1 Typical Use-Cases

- Download documents automatically
- Import documents automatically to the DMS
- Call the metadata from documents
- Call user information


---

## 2. Prerequisites

**2.1 Required Access**

- d.velop DMS instance
- Valid login data
- Access to the d.velop Actions API

**2.2 Required Information**

- Base URL of the d.velop instance
- User / API access
- Repository and/or Document IDs

---

## 3. Setting up the Credentials

For every Action Node you want to execute, you need to have your credentials set up. Without them, the API would not have the required information to execute calls.

<img width="1312" height="746" alt="image" src="https://github.com/user-attachments/assets/fe0a35f7-6bc2-4837-a995-02426ab822e5" />

**3.1 Base URL**

- This is just the Base URL of your instance, marked in blue (don't copy the last /)

<img width="600" height="41" alt="image" src="https://github.com/user-attachments/assets/2e89a2b6-0387-4ab9-8891-3c4090b817f0" />

**3.2 Authentication Method**

- The Bearer Token is nothing else except the API key you can find in the d.velop instance configuration, under Login -> API key
- There you have to create an API key. Keep in mind that the key only shows once, therefore you should save the key somewhere safe. Also keep this key for yourself and do **NOT** hand it out.

**3.3 Allowed HTTP Request**

- For the node to work you need to allow the HTTP requests.

---

## 4. Use the Node in a Workflow

To use this node in a workflow you need to open the **Nodes Panel** and search for *d.velop Actions*

---

**4.1 Pick an Action Mode**

- Here you can choose between 4 stable actions or your volatile actions.

<img width="564" height="356" alt="image" src="https://github.com/user-attachments/assets/1ec54de7-e1f5-4294-9212-d784db8ac2dd" />

---

**4.2 Stable Actions**

Stable actions are predefined, and they will always be the same.

They are the standard features such as:

- Download a document
- Get document info
- Get user info
- Import document

---

**4.3 Volatile Actions**

- Volatile actions aren't predefined and differ from d.velop user to user. They are actions that are not hard-coded and aren't a standard.
- These actions can also be created in the Process Studio script tab, and can be used in this node.

As an example:

<img width="431" height="272" alt="image" src="https://github.com/user-attachments/assets/1cdbbc41-5fc8-4e31-9fef-df1055f0b2ab" />

- Those are standard volatile Salesforce actions, and the Hello_World action is a script from the Process Studio.
- These actions are dynamic and the payload that they carry isn't displayed.

---

## 5. Stable Actions in Detail

This is going to showcase how the stable Actions work in detail.

---

**5.1 Download Document**

- To set up the download node manually, you just need to fill in the mandatory fields and you are ready to download the file.

<img width="461" height="486" alt="image" src="https://github.com/user-attachments/assets/befacd4b-82ea-49f7-a901-d0096416a674" />

- To find out what the *Repository* string and the *Document_ID* are, you need to open the document and copy the marked section.

<img width="1226" height="708" alt="Download_Document" src="https://github.com/user-attachments/assets/ea17fb6d-8fae-4bc9-937d-825eb2a40349" />

- The output will be displayed on the right side of the node.

<img width="660" height="353" alt="image" src="https://github.com/user-attachments/assets/22da756b-d62f-4be9-b69d-5524355a9068" />

---

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

This action displays all the information associated with the user. Please find below a list of all the functions that this action returns:

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

- To Acquire the User_ID of a DMS User, you need to go in to the Configuration -> Administration -> User account and group management
- From there you just need to click the User you want the ID From, and Copy the red marked section from the URL

<img width="1047" height="781" alt="Screenshot 2026-02-19 110016" src="https://github.com/user-attachments/assets/ddb2a6bb-e8cd-48ec-ac35-dce8445d0b8a" />


The output will be Displayed on the Output Tab:


<img width="1365" height="1142" alt="image" src="https://github.com/user-attachments/assets/6311374e-0825-42fd-bb55-cb9887a3128f" />

---

**5.4. Import Document**

This Action Allows you to Upload files directly to your DMS, using d.velop Inbound.
The Action does not return Any Values, it just Uploads Files, so they can be Indexed.

**5.4.1 Setting up the Wokflow**
- To work with this Action, you need a Minimal Workflow:

<img width="1423" height="536" alt="image" src="https://github.com/user-attachments/assets/1d0ccf5e-7a87-4e46-aa5f-de8c63943809" />

- In order to Upload a file with the d.velop Action, you need a File in your Workflow.
- As an small example the *"Read/Write Files from Disk"* Node is Used to get a file in to the Workflow. 

**5.4.2 Setting up the Node**
- This node in Paticular has an Input from The node before

<img width="1162" height="753" alt="image" src="https://github.com/user-attachments/assets/3adb6883-d02f-4c18-9089-064a53aaa0ef" />

**File Name**
- The File name can either be set manually every Time, or you write a simple Java Script Expression:
  ```bash
  {{ $json.fileName }}
  ```
**File Source**
- When configuring the node, set the File Source to From N8n Binary. This means the file will be taken from the binary data of a previous node in your workflow.
- Alternatively, you can use From Base64/String as the File Source. This option allows you to upload a file using its Base64-encoded content instead of binary data.

**Input Binary Property**
- The Input Binary Property defines the name of the binary field that contains the file. In most cases, this property is called: binary.

**Import Profile**
- In order to get the Import Profile you need to navigate to *configuration* -> *Document Managment* -> *Import* -> *Importoption* -> *Importprofile*

<img width="1076" height="599" alt="image" src="https://github.com/user-attachments/assets/8bac4b1c-b63d-418c-b9a4-66be1800e3e8" />

- In this setting you can Copy the red Marked *Import Profile*

**5.4.3 DMS Inbound**
- STILL UNDER CONSTRUCTION
- API IS BITCHING

## 6. Volatile Action in Detail

- The following is an instructional guide to setting up volatile actions and loading the payload correctly.

**6.1. Choose from your Actions**

<img width="730" height="653" alt="image" src="https://github.com/user-attachments/assets/dff6ac75-d274-4e18-ac10-081af5e83ae0" />

- If you chose your action you need to fill the Payload

**6.2. Payload of an Action**
- To ascertain the payload of an action, it is necessary to utilize an *API client*, such as *Bruno*. -> https://www.usebruno.com
- To retrieve all volatile actions, run this API call with the *base URL* and the *API key (token)*.
<img width="556" height="240" alt="image" src="https://github.com/user-attachments/assets/cb0dbcce-4425-4fcc-906d-b3a643f2d430" />

- If you execute this API call, you will receive a list of all the volatile actions.
- In terms of testing, we will examine the Salesforce_getRecord action.
 
```bash
{
    "id": "salesforce_get-record",
    "display_name": "Salesforce - Get Record",
    "tags": null,
    "description": "This operation gets a record.",
    "endpoint": "/actions/api/execute/salesforce_get-record",
    "execution_mode": "Synchron",
    "input_properties": [
      {
        "id": "objectApiName",
        "type": "String",
        "title": "Object API Name",
        "description": "",
        "required": true,
        "visibility": "Standard",
        "initial_value": "",
        "object_properties": null,
        "fixed_value_set": null,
        "data_query_url": "",
        "data_query_parameter": null
      },
      {
        "id": "recordId",
        "type": "String",
        "title": "Record ID",
        "description": "",
        "required": true,
        "visibility": "Standard",
        "initial_value": "",
        "object_properties": null,
        "fixed_value_set": null,
        "data_query_url": "",
        "data_query_parameter": null
      },
      {
        "id": "orgUrl",
        "type": "String",
        "title": "Salesforce Org URL",
        "description": "",
        "required": true,
        "visibility": "Advanced",
        "initial_value": "",
        "object_properties": null,
        "fixed_value_set": null,
        "data_query_url": "/salesforce/process/actions/values/orgs",
        "data_query_parameter": null
      }
    ],
    "output_properties": [
      {
        "id": "record",
        "type": "Object",
        "title": "Record",
        "description": "",
        "object_properties": null
      }
    ],
    "volatile": true
```
- The payload consists of the *input_properties*. So in this instance the payload is:

```bash
{
  "objectApiName": "Account",
  "recordId": "001XXXXXXXXXXXXXXX",
  "orgUrl": "https://your-org.salesforce.com"
}
```
**6.3 Assamble the Node**

- The last step is to Paste the Payload in the Node of your desire, fill the properties wirh values and Execute the Node!

<img width="939" height="577" alt="image" src="https://github.com/user-attachments/assets/3811a0fe-15e3-4093-93a5-c5f5d2ffd0cb" />


## 7. Error codes

- This section describes the most common error code that may occur when using the d.velop Actions Node

**7.1 Authentication Errors**

| Error Code | Message      | Cause                           | Solution                          |
| ---------- | ------------ | ------------------------------- | --------------------------------- |
| 401        | Unauthorized | Invalid or missing Bearer Token | Verify API key in credentials     |
| 403        | Forbidden    | Insufficient permissions        | Check user permissions in d.velop |
| 400        | Bad Request  | Invalid Base URL or headers     | Verify Base URL and credentials   |

Example response:

```bash
{
  "error": "Unauthorized"
}
```


**7.2 Document Errors**

| Error Code | Message              | Cause                   | Solution                 |
| ---------- | -------------------- | ----------------------- | ------------------------ |
| 404        | Document not found   | Invalid document ID     | Verify document ID       |
| 404        | Repository not found | Invalid repository ID   | Verify repository string |
| 400        | Invalid parameters   | Missing required fields | Check node configuration |

**7.3 Import Errors**

| Error Code | Message                | Cause                 | Solution                     |
| ---------- | ---------------------- | --------------------- | ---------------------------- |
| 400        | Invalid import profile | Wrong import profile  | Verify import profile        |
| 400        | Missing binary data    | Binary property empty | Verify input binary property |
| 413        | Payload too large      | File too large        | Reduce file size             |


**7.4 Volatile Action Errors**

| Error Code | Message               | Cause                  | Solution                 |
| ---------- | --------------------- | ---------------------- | ------------------------ |
| 400        | Invalid payload       | Missing payload fields | Verify payload structure |
| 404        | Action not found      | Invalid action ID      | Verify action exists     |
| 500        | Internal server error | Server-side issue      | Check d.velop system     |
