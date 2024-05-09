# Copyright (c) 2024, Medochemie and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import json
import math
import random
import datetime

# import frappe
from frappe.model.document import Document

class WeighingScaleEntry(Document):



	def validate(doc, method):
		pass


	def before_submit(doc, method):
		pass

	def before_cancel(doc, method):
		pass

@frappe.whitelist(allow_guest=True)
def api_endpoint(**kwargs):
	try:
		data = { "datetime" : datetime.timedelta(microseconds=-1).microseconds} # Runs database queries and returns data 
		return data 
	except Exception as e:
		return {'error':e} 

@frappe.whitelist()
def ping():
    return datetime.timedelta(microseconds=-1).microseconds