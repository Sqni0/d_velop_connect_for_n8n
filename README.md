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

---

## Overview

- The main goal of this project is to create a gateway to hyperautomation with other apps in the d.velop hemisphere. And this node basically does all that.

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
- This node is completely integrated in n8n and you can combine this node with whatever other nodes you need.

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

This is going to showcase how the stable nodes work in detail.

---

**5.1 Download Document**

- To set up the download node manually, you just need to fill in the mandatory fields and you are ready to download the file.

<img width="461" height="486" alt="image" src="https://github.com/user-attachments/assets/befacd4b-82ea-49f7-a901-d0096416a674" />

- To find out what the Repository string is, you need to open the document and copy the marked section.

<img width="1226" height="708" alt="Download_Document" src="https://github.com/user-attachments/assets/ea17fb6d-8fae-4bc9-937d-825eb2a40349" />

- The output will be displayed on the right side of the node.

<img width="660" height="353" alt="image" src="https://github.com/user-attachments/assets/22da756b-d62f-4be9-b69d-5524355a9068" />

---

**5.2 Get Document Info**

This action shows all information attached to the document.

**5.2.1 Setting up the Action**

<img width="577" height="501" alt="image" src="https://github.com/user-attachments/assets/54410412-5425-4aeb-addf-82db00a9c6ce" />

<img width="1401" height="878" alt="image" src="https://github.com/user-attachments/assets/360cf720-a709-47a9-a1ab-2b681ced2c20" />

---

**5.3 Get User Info**

This action shows all known information attached to the user.

**5.3.1 Setting up the Action**

<img width="580" height="421" alt="image" src="https://github.com/user-attachments/assets/21f70d38-d286-4653-b31a-b240af5f15fc" />

<img width="1047" height="781" alt="Screenshot" src="https://github.com/user-attachments/assets/ddb2a6bb-e8cd-48ec-ac35-dce8445d0b8a" />

<img width="1365" height="1142" alt="image" src="https://github.com/user-attachments/assets/6311374e-0825-42fd-bb55-cb9887a3128f" />

---

**5.4 Import Document**

This action allows you to upload files directly to your DMS using d.velop inbound.

---

**5.4.1 Setting up the Workflow**

<img width="1423" height="536" alt="image" src="https://github.com/user-attachments/assets/1d0ccf5e-7a87-4e46-aa5f-de8c63943809" />

---

**5.4.2 Setting up the Node**
- This node in Paticural has an Input from The node before

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

  **5.4.3 DMS Input**
// Das klappt nicht wegen dem API Time Stamp

## 6. Volatile Action in Detail

- Here your are going to find Out how to Setup any Volatile Action and how to fill the Payload with the Right stuff.

**6.1. Choose from your Actions**

<img width="730" height="653" alt="image" src="https://github.com/user-attachments/assets/dff6ac75-d274-4e18-ac10-081af5e83ae0" />

- If you chose your action you need to fill the Payload

**6.2. Payload of a Action**
- To find out what the Payload of a Action is you need to use a *API-Client* like *Bruno*
- To get all Volatile Actions you need to run this API call with the *Base URL* + the *API-Key (Token)*
<img width="556" height="240" alt="image" src="https://github.com/user-attachments/assets/cb0dbcce-4425-4fcc-906d-b3a643f2d430" />

- If you execute this API call you get a list of all the Volatile Actions back.
- Tetstwise we will take a look at the *Salesforce_get-recod* Action.
<details> 
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
</details>


- The Payload in this instance is:

  ```bash

  ```
  
