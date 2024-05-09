from __future__ import unicode_literals
from frappe import _

def get_data():
    return {
        'label': _('Weighing Scale'),
        'icon': 'fa fa-balance-scale',
        'items': [
            {
                'type': 'doctype',
                'name': 'Weighing Scale',
                'label': _('Weighing Scale'),
            },
        ]
    }