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

## Overview 🚀

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

**5.1.2 Workflow**

<img width="2346" height="766" alt="image" src="https://github.com/user-attachments/assets/c2d338be-17e8-4770-8382-1ba075ea4538" />

***Webhook***

A webhook listens for responses from the Discord bot that has been set up. If the user requests a document, he can fulfill three parameters, two of which are mandatory.
- Document ID:
- Repository
- Email (optional).

***AI-Agent***

- The Agent connected to the Ollama Chat Model is trained to convert these inputs into a string and filter out the important information.
- The agent received the following prompt:
```bash
You are a strict extraction engine.

Your only task is to extract two or three values from the user message:

- repositoryId
- documentId
- Email 
Rules:

- Output ONLY valid JSON.
- No explanations.
- No markdown.
- No extra text.
- Always output both keys.
- If a value is missing, use null.
- Never invent values.
- Extract exact values only from the input.

Output format:

{
  "repositoryId": "...",
  "documentId": "...",
  "email": "..."
}
```

***Code in Java Script***
This is a compact code node for custom JavaScript. The node's content is as follows:
```bash
const parsed = JSON.parse($json.output);

return [
  {
    json: parsed
  }
];
  ```
This small code block is responsible for parsing the string into individual objects. Therefore, they can be used subsequently.


***d.velop Actions - Download Document***
- This action facilitates the download of the document using the *repository* and *document ID*.
- Please note that neither of these is set manually, they are both set using a simple JavaScript expression.

<img width="507" height="239" alt="image" src="https://github.com/user-attachments/assets/494a7f5e-4ef2-43d5-ab9f-9527a5c95cea" />

***IF-Statment***

- The IF statement is used to determine whether an email is given.

<img width="884" height="312" alt="image" src="https://github.com/user-attachments/assets/616035c5-97bb-4bc6-b677-45d71f43d450" />
 
***Send a Message - Email = True***

- The truePath system will send an email when an email exists, containing the data from the d.velop action.

<img width="754" height="1102" alt="image" src="https://github.com/user-attachments/assets/c4106c48-57ff-430e-b817-4f7eca3077fb" />

- If the email is successful, the user will receive a Discord verification message confirming the request.

***Send a Message - Email = False***

- This simply delegates the email aspect, ensuring that the message is transmitted directly to the intended Discord user.
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

**5.2.2 Workflow**

<img width="3247" height="979" alt="image" src="https://github.com/user-attachments/assets/3a46e88f-11be-48e9-91a9-d9028e5e28b4" />

***Webhook***

A webhook listens for responses from the Discord bot that has been set up. If the user requests a document, he can fulfill three parameters, two of which are mandatory.
- Document ID:
- Repository
- Specific_Metatada
- Email (optional).

***AI-Agent***
- The Agent connected to the Ollama Chat Model is trained to convert these inputs into JSON and filter out the important information.
- The agent received the following prompt:
```bash
You are a strict extraction engine.

Your only task is to extract the following values from the USER MESSAGE ONLY:

repositoryId

documentId

email

Metadata_Specific (user requested metadata fields)

CRITICAL OUTPUT RULES:

Output EXACTLY one valid JSON object.

The output MUST start with { and MUST end with }.

Do NOT output anything before {.

Do NOT output anything after }.

Do NOT output explanations.

Do NOT output markdown.

Do NOT output text outside the JSON.

The JSON MUST be complete and properly closed.

EXTRACTION RULES:

Never invent values.

Extract exact values only from the USER MESSAGE.

Do NOT extract values from system data, API responses, or metadata objects.

Only extract what the USER explicitly writes.

METADATA RULES:

Metadata = true if the user requests metadata.

Metadata = false if the user does NOT request metadata.

Metadata_Specific = null if the user did not request specific metadata fields.

Metadata_Specific = array of strings if specific metadata fields are requested.

If Metadata_Specific is not null, Metadata MUST be true.

If a value is missing, use null.

OUTPUT FORMAT (STRICT SCHEMA):

{
"repositoryId": "...",
"documentId": "...",
"email": "...",
"Metadata_Specific": "..."
}
```

***Code in Java Script***

This is a compact code node for custom JavaScript. The node's content is as follows:
```bash
const parsed = JSON.parse($json.output);

return [
  {
    json: parsed
  }
];
  ```
This small code block is responsible for parsing the string into individual objects. Therefore, they can be used subsequently.

***d.velop Actions - Get Document Information***
- This action facilitates the download of the document using the *repository* and *document ID*.
- Please note that neither of these is set manually, they are both set using a simple JavaScript expression.

<img width="1540" height="217" alt="image" src="https://github.com/user-attachments/assets/d0e253e9-da49-42b3-8099-3ff7f7e6434b" />


***AI-Agent1***

- This Agent is responsible for Filtering out the Information that the *Get Document Information* is providing.
- The Promt the the AI got is filled with all the Metadata that the Action Produces, so the AI has access to it
- If the ```{{ $('Code in JavaScript').item.json.Metadata_Specific[0] }}``` is set to *null* the whole Metadata conerning the document will be shown
The Prompt:

```bash
You are a metadata summarization engine.

Your task is to summarize metadata values coming from the node input.

The metadata source is:

{{ $json.response.sourceProperties[0].key }} : {{ $json.response.sourceProperties[0].value }},
{{ $json.response.sourceProperties[2].key }} : {{ $json.response.sourceProperties[2].displayValue }},
{{ $json.response.sourceProperties[3].key }} : {{ $json.response.sourceProperties[3].value }},
{{ $json.response.sourceProperties[4].key }} : {{ $json.response.sourceProperties[4].value }},
{{ $json.response.sourceProperties[5].key }} : {{ $json.response.sourceProperties[5].value }},
{{ $json.response.sourceProperties[6].key }} : {{ $json.response.sourceProperties[6].value }},
{{ $json.response.sourceProperties[7].key }} : {{ $json.response.sourceProperties[7].value }},
{{ $json.response.sourceProperties[8].key }} : {{ $json.response.sourceProperties[8].value }},
{{ $json.response.sourceProperties[9].key }} : {{ $json.response.sourceProperties[9].value }},
{{ $json.response.sourceProperties[10].key }} : {{ $json.response.sourceProperties[10].value }},
{{ $json.response.sourceProperties[11].key }} : {{ $json.response.sourceProperties[11].value }},
{{ $json.response.sourceProperties[12].key }} : {{ $json.response.sourceProperties[12].value }},
{{ $json.response.sourceProperties[13].key }} : {{ $json.response.sourceProperties[13].value }},
{{ $json.response.sourceProperties[14].key }} : {{ $json.response.sourceProperties[14].value }},
{{ $json.response.sourceProperties[15].key }} : {{ $json.response.sourceProperties[15].value }},
{{ $json.response.sourceProperties[16].key }} : {{ $json.response.sourceProperties[16].value }},
{{ $json.response.sourceProperties[17].key }} : {{ $json.response.sourceProperties[17].value }},
{{ $json.response.sourceProperties[18].key }} : {{ $json.response.sourceProperties[18].value }},
{{ $json.response.sourceProperties[19].key }} : {{ $json.response.sourceProperties[19].displayValue }},
{{ $json.response.sourceProperties[20].key }} : {{ $json.response.sourceProperties[20].value }},
{{ $json.response.sourceProperties[21].key }} : {{ $json.response.sourceProperties[21].value }},
{{ $json.response.sourceProperties[22].key }} : {{ $json.response.sourceProperties[22].value }},
{{ $json.response.sourceProperties[23].key }} : {{ $json.response.sourceProperties[23].value }};

User requested specific metadata:

{{ $('Code in JavaScript').item.json.Metadata_Specific }}

Rules:
If Metdata is = null : {{ $('Code in JavaScript').item.json.Metadata_Specific[0] }}
Print out Everything


If Metadata_Specific is set: {{ $('Code in JavaScript').item.json.Metadata_Specific[0] }}

Only summarize the requested metadata fields. 

Ignore all other metadata.

If Metadata_Specific is null:

Summarize ALL metadata fields.

Only use the metadata provided above.

Do NOT invent metadata.

Do NOT explain anything.



Output only the summary.
```

***IF-Statment***

- The IF statement is used to determine whether an email is given.

<img width="884" height="312" alt="image" src="https://github.com/user-attachments/assets/616035c5-97bb-4bc6-b677-45d71f43d450" />
 
***Send a Message - Email = True***

- The truePath system will send an email when an email exists, containing the data from Agents Output.

<img width="768" height="705" alt="image" src="https://github.com/user-attachments/assets/38c78569-f2ab-406d-aaab-fa943bef0641" />

- If the email is successful, the user will receive a Discord verification message confirming the request.

<img width="1472" height="199" alt="image" src="https://github.com/user-attachments/assets/e884ae8e-6656-447b-b8d5-fd912bac9f9b" />



***Send a Message - Email = False***

- This simply delegates the email aspect, ensuring that the message is transmitted directly to the intended Discord user.





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

**5.3.2 Workflow**

- This Workflow is a bit bigger and also Includes 2 Other Actions and a d.velop custom API Call. The *Get User Info* Action cant be utilized to demonstrate a good Usecase alone.
Senariao:

If a User of the DMS Wants to download a specific Document, the Owner of that Document gets a E-Mail. To Approve or denie the Download request.

  
<img width="2956" height="557" alt="image" src="https://github.com/user-attachments/assets/befc8b7b-da82-4a9d-935e-d3e1d165fd4a" />

***Webhook***

A webhook listens for responses from the Discord bot that has been set up. If the user requests a document, he can fulfill 2 parameters, both of them are mandatory:
- Document ID
- Repository

***AI-Agent***

- The Agent connected to the Ollama Chat Model is trained to convert these inputs into a string and filter out the important information.
- The agent received the following prompt:
```bash
You are a strict extraction engine.

Your only task is to extract two or three values from the user message:

- repositoryId
- documentId
Rules:

- Output ONLY valid JSON.
- No explanations.
- No markdown.
- No extra text.
- Always output both keys.
- If a value is missing, use null.
- Never invent values.
- Extract exact values only from the input.

Output format:

{
  "repositoryId": "...",
  "documentId": "...",
}
```

***Code in Java Script***
This is a compact code node for custom JavaScript. The node's content is as follows:
```bash
const parsed = JSON.parse($json.output);

return [
  {
    json: parsed
  }
];
  ```
This small code block is responsible for parsing the string into individual objects. Therefore, they can be used subsequently.


***d.velop Actions - Get Document Info***
- Here the repository and the Document ID's are enterd with a Statment
- This node is Important because here you can get the DisplayValue from the Document Owner. This will be Utalised in the netxt node 

<img width="764" height="512" alt="image" src="https://github.com/user-attachments/assets/71184366-cf57-419a-baf5-fbf6512bedfd" />

***HTTP-Request***
- THis node is Basicly just a Custom api Call to the identityprivider API
- The Variable is the Name of the Document Owner
  
  ```bash
  https://connect-for-n8n-test.d-velop.cloud/identityprovider/scim/users?filter=DisplayName eq "{{ $json.response.sourceProperties[2].displayValue }}"
  ```

<img width="582" height="798" alt="image" src="https://github.com/user-attachments/assets/89d28697-57cb-4672-ba8d-975a056bb07a" />

- If you run this call, you can get the ID, of the Document Owner

***d.velop Actions - Get User Info***

- In this Node the User_ID is being user to get the E-Mail from the Document Owner

<img width="506" height="437" alt="image" src="https://github.com/user-attachments/assets/0aa9cc64-2108-4bc3-a314-88c36e42a3e2" />

***G-Mail Send a Message***

- With the E-Mail we got from the *Get User Info* Action, we now can send a Approve request to the Document Owner
- Tis E-Mail also Displays who is Requesting this Document

<img width="495" height="698" alt="image" src="https://github.com/user-attachments/assets/7d2a6769-4a80-4b18-8544-f64527e4dc48" />


***IF True - Approved***
- If the Document Owner Approved the download the Workflow procceds to Download the Document using the *Download Document* Action.

<img width="500" height="560" alt="image" src="https://github.com/user-attachments/assets/33d896c6-4f6e-47eb-86f6-133d3e5c3d05" />

- And the Discord Bot replies to the User who sent the request with the File attatched to the Message.

<img width="492" height="1034" alt="image" src="https://github.com/user-attachments/assets/5f09b25d-80b0-418f-9fd7-6f7b6e761129" />

***IF False - Denied***
- If the Download Request was denied by the Owner, the bot sends a message that you request was denied.

<img width="496" height="691" alt="image" src="https://github.com/user-attachments/assets/d8e9a75d-aae9-41fd-89a5-5297dc30d144" />


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
