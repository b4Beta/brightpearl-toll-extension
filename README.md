# Brightpearl to Toll Priority Extension

## Copy delivery address to Toll Priority
This extension copies delivery data from a Brightpearl order and stores it in localstorage.
The can then be used to populate fields in the Toll Online booking system

It copies the following selectors from a Brightpearl Order:
* #delivery_name
* #delivery_company
* #delivery_street_address
* #delivery_suburb
* #delivery_city
* #delivery_state
* #delivery_postcode
* #delivery_telephone
* #delivery_mobile
* #delivery_email_address

It populates the following selectors in a Toll Online consignment note:
* input[name=receiverContactName]
* input[name=receiverCompanyName]
* input[name=receiverAddress1]
* input[name=receiverAddress2]
* input[name=receiverSuburb]
* input[name=receiverPostCode]
* input[name=receiverEmailAddress]
* input[name=receiverContactNumber]
* input[name=connoteRef]

## Check address in Google Maps
It also creates a quick link URL to Google Maps to verify the address details

## Copy customer details
It also allows a user to copy the basic information from a customer and paste it into new contact.
This is useful if creating a second contact for an existing organisation
