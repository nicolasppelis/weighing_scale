# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in weighing_scale/__init__.py
from weighing_scale import __version__ as version

setup(
	name='weighing_scale',
	version=version,
	description='A custom application for weighing scale',
	author='Medochemie',
	author_email='admin@admin.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)