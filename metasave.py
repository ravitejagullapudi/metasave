from __future__ import unicode_literals
import io
import eel
import os
import json
from tinydb import TinyDB, Query
import shortuuid as suuid

storage_path = f'{os.environ["USERPROFILE"]}\\AppData\\Local\\.MetaSave\\db.json'
db = TinyDB(storage_path)
query = Query()
sections_table = db.table('sections')
if len(sections_table)==0:
    sections_table.insert({'sectionId':suuid.uuid(), 'sectionName':'Default'})

eel.init('web')



@eel.expose
def setStoragePath(path):
    storage_path = path


@eel.expose
def metasave(arg):
    print(arg)
    return "got it"

@eel.expose
def loadSections():
    sections = sections_table.all()
    s = []
    for section in sections:
        print(section)
        s.append({"id":section['sectionId'], "sectionName":section['sectionName']})
    return sections

@eel.expose
def loadSectionData(current_section_id):
    data = {}
    sections_table = db.table('sections')
    sections = sections_table.search(query.sectionId == str(current_section_id))
    if(len(sections)):
        data['sectionId'] = sections[0]['sectionId']
        data['sectionName'] = sections[0]['sectionName']
        data['groups']=[]
        groups_table = db.table('groups')
        groups = groups_table.search(query.sectionId == str(current_section_id))

        fields_table = db.table('fields')
        for group in groups:
            single_group = {}
            single_group['groupId'] = group['groupId']
            single_group['groupName'] = group['groupName']

            single_group['fields']=[]
            fields = fields_table.search(query.groupId == str(group['groupId']))
            for field in fields:
                single_field = {}
                single_field['fieldId'] = field['fieldId']
                single_field['label'] = field['label']
                single_field['value'] = field['value']
                
                single_group['fields'].append(single_field)
            
            data['groups'].append(single_group)
    
    print(data)
    return data

@eel.expose
def add_group(section_id,groupName):
    pass

@eel.expose
def remove_specific_data(current_section_id, group_id, field_id=None):
    global data
    try:
        groupSchema = data['sections'][current_section_id]
        if field_id is not None:
            groups = groupSchema['groups']
            for i in range(len(groups)):
                if (groupSchema['groups'][i]['groupId'] == group_id):
                    groupSchema['groups'][i]['fields'] = list(filter(
                        lambda field: field['fieldId'] != field_id, groupSchema['groups'][i]['fields']))
                    break
        else:
            groupSchema['groups'] = list(
                filter(lambda group: group['groupId'] != group_id, groupSchema['groups']))
        data['sections'][current_section] = groupSchema
        data_file1 = open(storage_path, "w")
        json.dump(data, data_file1, indent=2)
        data_file1.close()
        return True
    except Exception as e:
        print(e)
        return False

@eel.expose
def add_field(field):
    global data
    try:
        data_file1 = open(storage_path, "w")
        json.dump(data, data_file1, indent=2)
        data_file1.close()
        loadEntireData()
        return True
    except Exception as e:
        print(e)
        return False


eel.start('index.html', size=(700, 700), port=0)
