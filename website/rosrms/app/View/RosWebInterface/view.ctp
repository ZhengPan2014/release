<?php echo $this->Rms->ros($environment['Rosbridge']['uri']); ?>

<div id="container">
		<div id="header1" class="header">
			
		</div>
		<div id="header2" class="header">
			<p>ROSWeb</p>
			<a href="#" class="flat-btn jsRosConnect cssRosConnect">&nbsp;</a>
			<a href="#" class="flat-btn jsOpenWorkspace cssOpenWorkspace">&nbsp;</a>
			<a href="#" class="flat-btn jsToggleMovable cssToggleMovable">&nbsp;</a>

			<a href="#" class="jsConfiguration cssHeader2Link">Configuration</a>
			<a href="#" class="jsEventWidgetsMenu cssHeader2Link">Widgets</a>
			<a href="#" class="jsEventNewTab cssHeader2Link">New tab</a>
			<div class="clearfix"></div>
		</div>

		<div id="content">
			<div class="balloon cssConfigurationContainer jsConfigurationContainer">
				<h2>Configuration</h2>

				<div>
					<label>Connection</label>
					<input id="jsRosUrl" class="" type="text" name="connection" value="ws://localhost:9090" />
				</div>

				<div>
					<label>Workspace</label>
					<input id="jsWorkspaceName" type="text" name="workspace" value="new workspace" />
					<a href="#" class="flat-btn jsSaveWorkspace cssSaveWorkspace">&nbsp;</a>
				</div>
			</div>
			<div class="balloon cssWidgetsContainer jsWidgetsContainer">
				<div class="cssWidgets jsWidgets">
					<h2>Widgets</h2>
					<div class="cssWidgetGroups jsWidgetGroups">
					</div>
				</div>
			</div>
			<div class="cssMenuWidgetsSettings jsMenuWidgetsSettings">
				<div class="cssSettings">
					<h2>Widget Settings</h2>
					<input type="hidden" id="widgetSettings" data-widget-instance-id="" />
					<div class="cssSettingsSelection jsSettingsSelection">

					</div>
					<div class="cssSettingsBtn">
						<a href="#" class="btn btn-blue jsWidgetSettingsRefresh cssWidgetSettingsRefresh">Refresh</a>
						<a href="#" class="btn btn-grey jsWidgetSettingsCancel cssWidgetSettingsCancel">Cancel</a>
						<a href="#" class="btn btn-green jsWidgetSettingsConfirm cssWidgetSettingsConfirm">Confirm</a>
						<br /><br />
						<a href="#" class="btn btn-red jsWidgetSettingsRemove cssWidgetSettingsRemove">Remove</a>
					</div>
				</div>
			</div>
			<div id="tabs"></div>
		</div>

		<div id="footer">

		</div>
	</div>
