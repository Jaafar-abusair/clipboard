# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
Report:
- Agent ID
- Agent External ID
- Agent Name
- Number of hours
- Number of shifts
- Quarter
 
1- Create new table in the database to host agent_facility data, the new table should contains the following, (we can add later more metadata, like aggregation to enhance report generation performance) (Assuming agent can be book shifts in many facility, that why we can't add the External ID to the Agent table)
a- ID - Auto increment
a- agent_id - foreign key (Agent)
b- external_id - string (50)
c- facility_id - foreign key (Facility)
c- CreatedUTC - Auto value (Date UTC)
Unique(facility_id, external_id)
 
Sub Tasks
a- Generate Database script - 1h
b- Update API: OMR - 1h
Acceptance Criteria
- Table creation script should be submitted in the pull request
- Create all related OMR objects and functions
 
Time estimation
2 hours
 
2- On Facility's agents screen, update the function that load the agents data under the facility, to return external_id field if record exist for the agent under the facility
 
Sub Tasks
a- Update API: Retrieve function - 30m
b- Update UI: Agent info screen or load - 1h
c- Unit test - 30m
 
Acceptance Criteria
- New Field should be added "External ID" to the screen.
- If the record does not exist in the database the field will be empty.
- If the record exists in the database the field will be rendered with current value.
- Unit tests should be updated to reflect the changes and run successfully.
 
Time estimation
2 hours
 
3- On Facility's agents screen, update the function that save the agent information to save External Id field
 
Sub Tasks
a- Update API: Save function, the function should check if the external_id is used or not and return duplicate key exception - 30m
b- Update UI: Agent info on submit - 1h
c- Unit test - 30m
 
Acceptance Criteria
- If the record does not exist in the agent_facility table, create one.
- On saving External ID, the new value should be saved in the database.
- The key should be unique by facility, error message should be displayed for the user on duplicate.
- On refreshing the page the new value will be rendered.
- Unit tests should be updated to reflect the changes and run successfully.
 
Time estimation
2 hours
 
4- Update getShiftsByFacility function to retrieve Agent external_id field if it exists, and return it with the agent metadata.
 
Sub Tasks
a- Update API: return external_id field - 15m
c- Unit test - 15m
 
- If the record exists in agent_facility table the value should be returned
 
Time estimation
30m
 
5- Update PDF report generation to display "External ID" field
 
Sub Tasks
a- Update UI: Read external_id field and render the value to "External ID" field - 15m
 
Acceptance Criteria
- Agents with external_id set in the database, the value will appear in the report.
 
Time estimation
20m
 
Assumptions:
- The generated report already does summation for the shifts, otherwise a ticket for that should be created.