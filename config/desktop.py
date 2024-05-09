# -*- coding: utf-8 -*-
from frappe import _

def get_data():
	return [
		{
			"module_name": "Tutorial",
			"color": "grey",
			'icon': 'fa fa-balance-scale',
			"type": "module",
			'label': _('Weighing Scale')
        }
	]

# def get_data():
#     return {
#         'fieldname': 'Desk',
#         'transactions': [
#             {
#                 'label': _('Weighing Scale'),
#                 'icon': 'fa fa-balance-scale',
#                 'items': [
#                     {
#                         'type': 'doctype',
#                         'name': 'Weighing Scale Entry',
#                         'label': _('Weighing Scale Entry'),
#                     },
#                 ]
#             },
#         ]
#     }
