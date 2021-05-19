from __future__ import unicode_literals
import io
import eel
import os
import json
from tinydb import TinyDB, Query
import shortuuid as suuid

# Configuring Path
directory_path = f'{os.environ["USERPROFILE"]}\\.MetaSave\\'
file_path = f'db.json'
storage_path = directory_path+file_path

if not os.path.exists(directory_path):
    os.makedirs(directory_path)

db = TinyDB(storage_path)
query = Query()

# If there are no sections it will create a default section
sections_table = db.table('sections')
if len(sections_table) == 0:
    sections_table.insert(
        {'sectionId': suuid.uuid(), 'sectionName': 'Default'})


# Check for updates
version = 1.0


# Initialising eel
eel.init('web')

@eel.expose
def get_version():
    return version
    
@eel.expose
def get_username():
    fields_table = db.table('fields')
    return {
        "username":os.environ["USERPROFILE"].split('\\')[-1],
        "fields_count":len(fields_table)
    }

@eel.expose
def setStoragePath(path):
    storage_path = path


@eel.expose
def metasave(arg):
    #print(arg)
    return "got it"

# To load sections


@eel.expose
def loadSections():
    sections = sections_table.all()
    s = []
    for section in sections:
        # #print(section)
        s.append({"id": section['sectionId'],
                 "sectionName": section['sectionName']})
    return sections

# To load groups and fields for given section


@eel.expose
def loadSectionData(current_section_id):
    data = {}
    sections_table = db.table('sections')
    sections = sections_table.search(
        query.sectionId == str(current_section_id))
    if(len(sections)):
        data['sectionId'] = sections[0]['sectionId']
        data['sectionName'] = sections[0]['sectionName']
        data['groups'] = []
        groups_table = db.table('groups')
        groups = groups_table.search(
            query.sectionId == str(current_section_id))
        # #print(groups)
        fields_table = db.table('fields')
        for group in groups:
            single_group = {}
            single_group['groupId'] = group['groupId']
            single_group['groupName'] = group['groupName']

            single_group['fields'] = []
            fields = fields_table.search(
                query.groupId == str(group['groupId']))
            for field in fields:
                single_field = {}
                single_field['fieldId'] = field['fieldId']
                single_field['label'] = field['label']
                single_field['value'] = field['value']

                single_group['fields'].append(single_field)

            data['groups'].append(single_group)

    #print(data)
    return data

# Add Section


@eel.expose
def add_section(section_name):
    try:
        sections_table = db.table('sections')
        sections_table.insert({
            'sectionId': suuid.uuid(),
            'sectionName': section_name
        })
        return True
    except Exception as e:
        #print(e)
        return False

# Edit Section
@eel.expose
def update_section(section_id, section_name):
    # #print(section_id, section_name)
    try:
        sections_table = db.table('sections')
        sections_table.update(
            {
                'sectionName': section_name
            },
            query.sectionId == str(section_id)
        )
        return True
    except Exception as e:
        return False


# Add group
@eel.expose
def add_group(section_id, groupName):
    try:
        groups_table = db.table('groups')
        groups_table.insert({
            'sectionId': section_id,
            'groupId': suuid.uuid(),
            'groupName': groupName
        })
        return True
    except Exception as e:
        #print("Adding Group: ")
        #print(e)
        return False

# Update Group
@eel.expose
def update_group(section_id, group_id,group_name):
    #print(section_id,group_id, group_name)
    try:
        groups_table = db.table('groups')
        groups_table.update(
            {
                'groupName': group_name
            },
            query.sectionId == str(section_id) and query.groupId == str(group_id)
        )
        return True
    except Exception as e:
        return False


# Add field
@eel.expose
def add_field(field_detail):
    global data
    try:
        fields_table = db.table('fields')
        fields_table.insert({
            'sectionId': field_detail["sectionId"],
            'groupId': field_detail["groupId"],
            'fieldId': suuid.uuid(),
            'label': field_detail["field"]["label"],
            'value': field_detail["field"]["value"]
        })
        # #print(fields_table)
        return True
    except Exception as e:
        #print(e)
        return False

# Remove group or field


@eel.expose
def remove_specific_data(current_section_id, group_id=None, field_id=None):
    global data
    try:
        if field_id is not None:
            fields_table = db.table('fields')
            fields_table.remove(query.sectionId == str(
                current_section_id) and query.groupId == str(group_id) and query.fieldId == field_id)
        elif group_id is not None:
            fields_table = db.table('fields')
            fields_table.remove(query.sectionId == str(
                current_section_id) and query.groupId == str(group_id))
            groups_table = db.table('groups')
            groups_table.remove(query.sectionId == str(
                current_section_id) and query.groupId == str(group_id))
        else:
            fields_table = db.table('fields')
            fields_table.remove(query.sectionId == str(current_section_id))
            groups_table = db.table('groups')
            groups_table.remove(query.sectionId == str(current_section_id))
            sections_table = db.table('sections')
            if(len(sections_table) > 1):
                sections_table.remove(
                    query.sectionId == str(current_section_id))
        return True
    except Exception as e:
        #print(e)
        return False


eel.start('index.html', size=(700, 700), port=0)
