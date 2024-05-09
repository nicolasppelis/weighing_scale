# Copyright (c) 2022, Youssef Restom and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import json
import math
import random

from frappe.model.document import Document


class WeighingScaleValues(Document):

    @frappe.whitelist()
    def test():
        return '4'