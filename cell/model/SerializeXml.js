/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

/**
 * @param {Window} window
 * @param {undefined} undefined
 */
(function (window, undefined) {
	var CellValueType = AscCommon.CellValueType;

	AscCommonExcel.Workbook.prototype.toZip = function (zip, context) {
		context.wb = this;
		context.InitSaveManager = new AscCommonExcel.InitSaveManager(this);

		var memory = new AscCommon.CMemory();
		memory.context = context;
		var filePart = new AscCommon.openXml.OpenXmlPackage(zip, memory);
		var wbXml = new CT_Workbook(this);
		var wbPart = filePart.addPart(AscCommon.openXml.Types.workbook);
		wbPart.part.setDataXml(wbXml, memory);
		memory.Seek(0);

		if (context.oSharedStrings.index > 0) {
			var sharedString = new CT_SharedStrings();
			sharedString.initFromMap(this, context.oSharedStrings);
			var sharedStringPart = wbPart.part.addPart(AscCommon.openXml.Types.sharedStringTable);
			sharedStringPart.part.setDataXml(sharedString, memory);
			memory.Seek(0);
		}
		memory.WriteXmlString('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><fonts count="1" x14ac:knownFonts="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><charset val="204"/><scheme val="minor"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/><extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"><x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext><ext uri="{9260A510-F301-46a8-8635-F512D64BE5F5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"><x15:timelineStyles defaultTimelineStyle="TimeSlicerStyleLight1"/></ext></extLst></styleSheet>');
		sampleData = memory.GetDataUint8();
		var stylePart = wbPart.part.addPart(AscCommon.openXml.Types.workbookStyles);
		stylePart.part.setData(sampleData);
		memory.Seek(0);

		memory.WriteXmlString('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light" panose="020F0302020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック Light"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线 Light"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Angsana New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri" panose="020F0502020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游明朝"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/><a:extLst><a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}"><thm15:themeFamily xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}"/></a:ext></a:extLst></a:theme>');
		var sampleData = memory.GetDataUint8();
		var themePart = wbPart.part.addPart(AscCommon.openXml.Types.theme);
		themePart.part.setData(sampleData);
		memory.Seek(0);
	};

	function getSimpleArrayFromXml (reader, childName, attrName, attrType) {
		var res = [];
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name2 = reader.GetNameNoNS();
			if (childName === name2) {
				while (reader.MoveToNextAttribute()) {
					if (attrName === reader.GetNameNoNS()) {
						res.push(reader.GetValue());
					}
				}
			}
		}
		return res;
	}

	function CT_Workbook(wb) {
		//Members
		this.wb = wb;
		this.sheets = null;
		this.pivotCaches = null;
		this.externalReferences = null;
		this.extLst = null;
		this.slicerCachesIds = null;
		this.newDefinedNames = null;
	}
	CT_Workbook.prototype.fromXml = function(reader) {
		if (!reader.ReadNextNode()) {
			return;
		}
		if ("workbook" !== reader.GetNameNoNS()) {
			if (!reader.ReadNextNode()) {
				return;
			}
		}


		var val;
		var depth2, name2;
		if ("workbook" === reader.GetNameNoNS()) {
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("sheets" === name) {
					var sheets = new CT_Sheets(this.wb);
					sheets.fromXml(reader);
					this.sheets = sheets.sheets;
				} else if ("pivotCaches" === name) {
					var pivotCaches = new CT_PivotCaches();
					pivotCaches.fromXml(reader);
					this.pivotCaches = pivotCaches.pivotCaches;
				} else if ("workbookPr" === name) {
					this.wb.workbookPr = {};
					while (reader.MoveToNextAttribute()) {
						/*if ("allowRefreshQuery" === reader.GetName()) {
							val = reader.GetValueBool();
							this.allowRefreshQuery = val;
						} else if ("autoCompressPictures" === reader.GetName()) {
							val = reader.GetValueBool();
							this.autoCompressPictures = val;
						} else if ("backupFile" === reader.GetName()) {
							val = reader.GetValueBool();
							this.backupFile = val;
						} else if ("checkCompatibility" === reader.GetName()) {
							val = reader.GetValueBool();
							this.checkCompatibility = val;
						} else if ("codeName" === reader.GetName()) {
							val = reader.GetValue();
							this.codeName = val;
						} else*/ if ("date1904" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.workbookPr.Date1904 = val;
						} else if ("dateCompatibility" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.workbookPr.DateCompatibility = val;
						} /*else if ("defaultThemeVersion" === reader.GetName()) {
							val = reader.GetValueInt();
							this.defaultThemeVersion = val;
						} else if ("filterPrivacy" === reader.GetName()) {
							val = reader.GetValueBool();
							this.filterPrivacy = val;
						}*/ else if ("hidePivotFieldList" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.workbookPr.HidePivotFieldList = val;
						} /*else if ("promptedSolutions" === reader.GetName()) {
							val = reader.GetValueBool();
							this.promptedSolutions = val;
						} else if ("publishItems" === reader.GetName()) {
							val = reader.GetValueBool();
							this.publishItems = val;
						} else if ("refreshAllConnections" === reader.GetName()) {
							val = reader.GetValueBool();
							this.refreshAllConnections = val;
						} else if ("showBorderUnselectedTables" === reader.GetName()) {
							val = reader.GetValueBool();
							this.showBorderUnselectedTables = val;
						} else if ("showInkAnnotation" === reader.GetName()) {
							val = reader.GetValueBool();
							this.showInkAnnotation = val;
						} else if ("showObjects" === reader.GetName()) {
							val = reader.GetValue();
							this.showObjects = val;
						}*/ else if ("showPivotChartFilter" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.workbookPr.ShowPivotChartFilter = val;
						} /*else if ("updateLinks" === reader.GetName()) {
							val = reader.GetValue();
							this.updateLinks = val;
						}*/
					}
				} else if ("bookViews" === name) {
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("workbookView" === name2) {
							while (reader.MoveToNextAttribute()) {
								if ("activeTab" === reader.GetNameNoNS()) {
									this.wb.nActive = reader.GetValueInt();
								}
							}
						}
					}
				} else if ("definedNames" === name) {
					//this.readAttr(reader);
					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("definedName" === name2 || "NamedRange" === name2) {
							var oNewDefinedName = new Asc.asc_CDefName();
							oNewDefinedName.fromXml(reader);
							//TODO readResult!!!
							if (!this.newDefinedNames) {
								this.newDefinedNames = [];
							}
							this.newDefinedNames.push(oNewDefinedName);
							//this.InitOpenManager.oReadResult.defNames.push(oNewDefinedName);
						}
					}

				} else if ("calcPr" === name) {
					while (reader.MoveToNextAttribute()) {
						if ("calcId" === reader.GetName()) {
							val = reader.GetValueInt();
							this.wb.calcPr.calcId = val;
						} else if ("calcMode" === reader.GetName()) {
							val = reader.GetValue();
							this.wb.calcPr.calcMode = val;
						} else if ("fullCalcOnLoad" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.fullCalcOnLoad = val;
						} else if ("refMode" === reader.GetName()) {
							val = reader.GetValue();
							this.wb.calcPr.refMode = val;
						} else if ("iterate" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.iterate = val;
						} else if ("iterateCount" === reader.GetName()) {
							val = reader.GetValueInt();
							this.wb.calcPr.iterateCount = val;
						} else if ("iterateDelta" === reader.GetName()) {
							val = reader.GetValue();
							this.wb.calcPr.iterateDelta = val;
						} else if ("fullPrecision" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.fullPrecision = val;
						} else if ("calcCompleted" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.calcCompleted = val;
						} else if ("calcOnSave" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.calcOnSave = val;
						} else if ("concurrentCalc" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.concurrentCalc = val;
						} else if ("concurrentManualCount" === reader.GetName()) {
							val = reader.GetValueInt();
							this.wb.calcPr.concurrentManualCount = val;
						} else if ("forceFullCalc" === reader.GetName()) {
							val = reader.GetValueBool();
							this.wb.calcPr.forceFullCalc = val;
						}
					}
				} else if ("externalReferences" === name) {
					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("externalReference" === name2) {
							while (reader.MoveToNextAttribute()) {
								if ("id" === reader.GetNameNoNS()) {
									val = reader.GetValue();
									if (!this.externalReferences) {
										this.externalReferences = [];
									}
									this.externalReferences.push(val);
								}
							}
						}
					}

				} else if ("comments" === name) {
					//TODO разобраться как читаются/записываются комменты в бинарник



				}  else if ("slicerCaches" === name) {
					if (!this.slicerCachesIds) {
						this.slicerCachesIds = [];
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("slicerCache" === name2) {

							while (reader.MoveToNextAttribute()) {
								if ("id" === reader.GetNameNoNS()) {
									this.slicerCachesIds.push(reader.GetValue());
								}
							}
						}
					}
				} else if ("workbookProtection" === name) {
					var workbooProtection = new Asc.CWorkbookProtection(this.wb);
					workbooProtection.fromXml(reader);
					this.wb.workbookProtection = workbooProtection;
				} else if ("extLst" === name) {
					var extLst = new COfficeArtExtensionList(this);
					extLst.fromXml(reader);
					this.extLst = extLst.arrExt;
				}

				//TODO
				//c_oSerWorkbookTypes.VbaProject
				//c_oSerWorkbookTypes.JsaProject
			}
		}
	};
	CT_Workbook.prototype.toXml = function (writer) {
		writer.WriteXmlString("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
		writer.WriteXmlNodeStart("workbook");
		writer.WriteXmlString(' xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"');
		writer.WriteXmlAttributesEnd();

		var oWorkbookPr = this.wb.WorkbookPr;
		if (oWorkbookPr != null) {
			writer.WriteXmlNodeStart('workbookPr');

			/*WritingStringNullableAttrBool(L"allowRefreshQuery", m_oAllowRefreshQuery);
			WritingStringNullableAttrBool(L"autoCompressPictures", m_oAutoCompressPictures);
			WritingStringNullableAttrBool(L"backupFile", m_oBackupFile);
			WritingStringNullableAttrBool(L"checkCompatibility", m_oCheckCompatibility);
			WritingStringNullableAttrBool(L"codeName", m_oCodeName);
			WritingStringNullableAttrBool(L"date1904", m_oDate1904);
			WritingStringNullableAttrBool(L"dateCompatibility", m_oDateCompatibility);
			WritingStringNullableAttrInt(L"defaultThemeVersion", m_oDefaultThemeVersion, m_oDefaultThemeVersion->GetValue());
			WritingStringNullableAttrBool(L"filterPrivacy", m_oFilterPrivacy);
			WritingStringNullableAttrBool(L"hidePivotFieldList", m_oHidePivotFieldList);
			WritingStringNullableAttrBool(L"promptedSolutions", m_oPromptedSolutions);
			WritingStringNullableAttrBool(L"publishItems", m_oPublishItems);
			WritingStringNullableAttrBool(L"refreshAllConnections", m_oRefreshAllConnections);
			WritingStringNullableAttrBool(L"showBorderUnselectedTables", m_oShowBorderUnselectedTables);
			WritingStringNullableAttrBool(L"showInkAnnotation", m_oShowInkAnnotation);
			WritingStringNullableAttrBool(L"showObjects", m_oShowObjects);
			WritingStringNullableAttrBool(L"showPivotChartFilter", m_oShowPivotChartFilter);
			WritingStringNullableAttrString(L"updateLinks", m_oUpdateLinks, m_oUpdateLinks->ToString());*/

			writer.WriteXmlNullableAttributeBool("date1904", this.wb.WorkbookPr.Date1904);
			writer.WriteXmlNullableAttributeBool("dateCompatibility", this.wb.WorkbookPr.DateCompatibility);
			writer.WriteXmlNullableAttributeBool("hidePivotFieldList", this.wb.WorkbookPr.HidePivotFieldList);
			writer.WriteXmlNullableAttributeBool("showPivotChartFilter", this.wb.WorkbookPr.ShowPivotChartFilter);
			writer.WriteXmlAttributesEnd(true);
			writer.WriteXmlNodeEnd('workbookPr');
		}

		if (this.wb.workbookProtection) {
			this.wb.workbookProtection.toXml(writer);
		}

		writer.WriteXmlNodeStart('bookViews');
		writer.WriteXmlAttributesEnd();
		writer.WriteXmlNodeStart('workbookView');
		if (null != this.wb.nActive) {
			writer.WriteXmlAttributeNumber("activeTab", this.wb.nActive);
		}
		writer.WriteXmlAttributesEnd(true);
		writer.WriteXmlNodeEnd('bookViews');

		var sheetsXml = new CT_Sheets(this.wb);
		sheetsXml.toXml(writer);

		//m_oExternalReferences

		var defNameList = writer.context.InitSaveManager.defNameList;
		if (defNameList && defNameList.length) {
			writer.WriteXmlNodeStart("definedNames");

			for (var i = 0; i < defNameList.length; ++i) {
				if (defNameList[i]) {
					defNameList[i].toXML(writer);
				}
			}

			writer.WriteXmlNodeEnd("definedNames");
		}

		writer.WriteXmlNodeStart('calcPr');
		writer.WriteXmlNullableAttributeNumber("calcId", this.calcId != undefined ? this.calcId : null);
		writer.WriteXmlNullableAttributeString("calcMode", this.calcMode != undefined ? this.calcMode : null);
		writer.WriteXmlNullableAttributeBool("fullCalcOnLoad", this.fullCalcOnLoad != undefined ? this.fullCalcOnLoad : null);
		writer.WriteXmlNullableAttributeString("refMode", this.refMode != undefined ? this.refMode : null);
		writer.WriteXmlNullableAttributeBool("iterate", this.iterate != undefined ? this.iterate : null);
		writer.WriteXmlNullableAttributeNumber("iterateCount", this.iterateCount != undefined ? this.iterateCount : null);
		writer.WriteXmlNullableAttributeNumber("iterateDelta", this.iterateDelta != undefined ? this.iterateDelta : null);
		writer.WriteXmlNullableAttributeBool("fullPrecision", this.fullPrecision != undefined ? this.fullPrecision : null);
		writer.WriteXmlNullableAttributeBool("calcCompleted", this.calcCompleted != undefined ? this.calcCompleted : null);
		writer.WriteXmlNullableAttributeBool("calcOnSave", this.calcOnSave != undefined ? this.calcOnSave : null);
		writer.WriteXmlNullableAttributeBool("concurrentCalc", this.concurrentCalc != undefined ? this.concurrentCalc : null);
		writer.WriteXmlNullableAttributeNumber("concurrentManualCount", this.concurrentManualCount != undefined ? this.concurrentManualCount : null);
		writer.WriteXmlNullableAttributeBool("forceFullCalc", this.forceFullCalc != undefined ? this.forceFullCalc : null);
		writer.WriteXmlAttributesEnd(true);

		/*if(m_oPivotCachesXml.IsInit())
			writer.WriteString(m_oPivotCachesXml.get());
		if(m_oExtLst.IsInit())
			writer.WriteString(m_oExtLst->toXMLWithNS(L""));*/

		writer.WriteXmlNodeEnd("workbook");
	};


	Asc.CWorkbookProtection.prototype.toXml = function (writer) {

		/*writer.WriteString(L"<workbookProtection");
							WritingStringNullableAttrString(L"workbookAlgorithmName", m_oWorkbookAlgorithmName, m_oWorkbookAlgorithmName->ToString());
							WritingStringNullableAttrString(L"workbookHashValue", m_oWorkbookHashValue, m_oWorkbookHashValue.get());
							WritingStringNullableAttrString(L"workbookSaltValue", m_oWorkbookSaltValue, m_oWorkbookSaltValue.get());
							WritingStringNullableAttrInt(L"workbookSpinCount", m_oWorkbookSpinCount, m_oWorkbookSpinCount->GetValue());
							WritingStringNullableAttrInt(L"lockStructure", m_oLockStructure, m_oLockStructure->ToBool() ? 1 : 0);
							WritingStringNullableAttrInt(L"lockWindows", m_oLockWindows, m_oLockWindows->ToBool() ? 1 : 0);
							WritingStringNullableAttrString(L"workbookPassword", m_oPassword, m_oPassword.get());
						writer.WriteString(L"/>");*/

		writer.WriteXmlString("<workbookProtection");
		writer.WriteXmlNullableAttributeString("workbookAlgorithmName", this.workbookAlgorithmName);
		writer.WriteXmlNullableAttributeString("workbookHashValue", this.workbookHashValue);
		writer.WriteXmlNullableAttributeString("workbookSaltValue", this.workbookSaltValue);
		writer.WriteXmlNullableAttributeNumber("workbookSpinCount", this.workbookSpinCount);
		writer.WriteXmlNullableAttributeNumber("lockStructure", this.lockStructure ? 1 : 0);
		writer.WriteXmlNullableAttributeNumber("lockWindows", this.lockWindows ? 1 : 0);
		writer.WriteXmlNullableAttributeString("workbookPassword", this.workbookPassword);
		writer.WriteXmlString("/>");
	};

	Asc.CWorkbookProtection.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);

						if (!oReader.IsEmptyNode())
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.CWorkbookProtection.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="lockStructure" type="xsd:boolean" use="optional" default="false"/>
		4386 <xsd:attribute name="lockWindows" type="xsd:boolean" use="optional" default="false"/>
		4387 <xsd:attribute name="lockRevision" type="xsd:boolean" use="optional" default="false"/>Annex A
		4491
		4388 <xsd:attribute name="revisionsAlgorithmName" type="s:ST_Xstring" use="optional"/>
		4389 <xsd:attribute name="revisionsHashValue" type="xsd:base64Binary" use="optional"/>
		4390 <xsd:attribute name="revisionsSaltValue" type="xsd:base64Binary" use="optional"/>
		4391 <xsd:attribute name="revisionsSpinCount" type="xsd:unsignedInt" use="optional"/>
		4392 <xsd:attribute name="workbookAlgorithmName" type="s:ST_Xstring" use="optional"/>
		4393 <xsd:attribute name="workbookHashValue" type="xsd:base64Binary" use="optional"/>
		4394 <xsd:attribute name="workbookSaltValue" type="xsd:base64Binary" use="optional"/>
		4395 <xsd:attribute name="workbookSpinCount" type="xsd:unsignedInt" use="optional"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if(oReader, (L"workbookAlgorithmName"), m_oWorkbookAlgorithmName)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"workbookHashValue"), m_oWorkbookHashValue)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"workbookSaltValue"), m_oWorkbookSaltValue)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"workbookSpinCount"), m_oWorkbookSpinCount)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"revisionsAlgorithmName"), m_oRevisionsAlgorithmName)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"revisionsHashValue"), m_oRevisionsHashValue)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"revisionsSaltValue"), m_oRevisionsSaltValue)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"revisionsSpinCount"), m_oRevisionsSpinCount)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"lockRevision"), m_oLockRevision)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"lockStructure"), m_oLockStructure)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"lockWindows"), m_oLockWindows)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"workbookPassword"), m_oPassword)*/

//serialize
		/*if (c_oSerWorkbookProtection.LockStructure == type) {
						workbookProtection.lockStructure = this.stream.GetBool();
					} else if (c_oSerWorkbookProtection.LockWindows == type) {
						workbookProtection.lockWindows = this.stream.GetBool();
					} else if (c_oSerWorkbookProtection.LockRevision == type) {
						workbookProtection.lockRevision = this.stream.GetBool();
					} else if (c_oSerWorkbookProtection.RevisionsAlgorithmName == type) {
						workbookProtection.revisionsAlgorithmName = this.stream.GetUChar();
					} else if (c_oSerWorkbookProtection.RevisionsSpinCount == type) {
						workbookProtection.revisionsSpinCount = this.stream.GetLong();
					} else if (c_oSerWorkbookProtection.RevisionsHashValue == type) {
						workbookProtection.revisionsHashValue = this.stream.GetString2LE(length);
					} else if (c_oSerWorkbookProtection.RevisionsSaltValue == type) {
						workbookProtection.revisionsSaltValue = this.stream.GetString2LE(length);
					} else if (c_oSerWorkbookProtection.WorkbookAlgorithmName == type) {
						workbookProtection.workbookAlgorithmName = this.stream.GetUChar();
					} else if (c_oSerWorkbookProtection.WorkbookSpinCount == type) {
						workbookProtection.workbookSpinCount = this.stream.GetLong();
					} else if (c_oSerWorkbookProtection.WorkbookHashValue == type) {
						workbookProtection.workbookHashValue = this.stream.GetString2LE(length);
					} else if (c_oSerWorkbookProtection.WorkbookSaltValue == type) {
						workbookProtection.workbookSaltValue = this.stream.GetString2LE(length);
					} else if (c_oSerWorkbookProtection.Password == type) {
						workbookProtection.workbookPassword = this.stream.GetString2LE(length);
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("workbookAlgorithmName" === reader.GetName()) {
				val = reader.GetValue();
				this.workbookAlgorithmName = AscCommonExcel.getAlgorithmNameFromXml(val);
			} else if ("workbookHashValue" === reader.GetName()) {
				val = reader.GetValue();
				this.workbookHashValue = val;
			} else if ("workbookSaltValue" === reader.GetName()) {
				val = reader.GetValue();
				this.workbookSaltValue = val;
			} else if ("workbookSpinCount" === reader.GetName()) {
				val = reader.GetValueInt();
				this.workbookSpinCount = val;
			} else if ("revisionsAlgorithmName" === reader.GetName()) {
				val = reader.GetValue();
				this.revisionsAlgorithmName = AscCommonExcel.getAlgorithmNameFromXml(val);
			} else if ("revisionsHashValue" === reader.GetName()) {
				val = reader.GetValue();
				this.revisionsHashValue = val;
			} else if ("revisionsSaltValue" === reader.GetName()) {
				val = reader.GetValue();
				this.revisionsSaltValue = val;
			} else if ("revisionsSpinCount" === reader.GetName()) {
				val = reader.GetValueInt();
				this.revisionsSpinCount = val;
			} else if ("lockRevision" === reader.GetName()) {
				val = reader.GetValueBool();
				this.lockRevision = val;
			} else if ("lockStructure" === reader.GetName()) {
				val = reader.GetValueBool();
				this.lockStructure = val;
			} else if ("lockWindows" === reader.GetName()) {
				val = reader.GetValueBool();
				this.lockWindows = val;
			} else if ("workbookPassword" === reader.GetName()) {
				val = reader.GetValue();
				this.workbookPassword = val;
			}
		}
	};

	AscCommonExcel.Worksheet.prototype.fromXml = function (reader) {
		if (!reader.ReadNextNode()) {
			return;
		}
		if ("worksheet" !== reader.GetNameNoNS()) {
			if (!reader.ReadNextNode()) {
				return;
			}
		}


		/*if ( c_oSerWorksheetsTypes.WorksheetProp == type )
		{
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadWorksheetProp(t,l, oWorksheet);
			});
		}
		else if ( c_oSerWorksheetsTypes.Cols == type )
		{
			var aTempCols = [];
			res = this.bcr.Read1(length, function(t,l){
				return oThis.ReadWorksheetCols(t,l, aTempCols, oWorksheet, oThis.aCellXfs);
			});

			//если есть стиль последней колонки, назначаем его стилем всей таблицы и убираем из колонок
			var oAllCol = null;
			if(aTempCols.length > 0)
			{
				var oLast = aTempCols[aTempCols.length - 1];
				if(AscCommon.gc_nMaxCol == oLast.Max)
				{
					oAllCol = oWorksheet.getAllCol();
					oLast.col.cloneTo(oAllCol);
				}
			}
			for(var i = 0; i < aTempCols.length; ++i)
			{
				var elem = aTempCols[i];
				if(elem.Max >= oWorksheet.nColsCount)
					oWorksheet.nColsCount = elem.Max;
				if(null != oAllCol && oAllCol.isEqual(elem.col))
					continue;

				for(var j = elem.Min; j <= elem.Max; j++){
					var oNewCol = new AscCommonExcel.Col(oWorksheet, j - 1);
					elem.col.cloneTo(oNewCol);
					oWorksheet.aCols[oNewCol.index] = oNewCol;
				}
			}
		}
		else if ( c_oSerWorksheetsTypes.SheetFormatPr == type )
		{
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadSheetFormatPr(t,l, oWorksheet);
			});
		}
		else if ( c_oSerWorksheetsTypes.PageMargins == type )
		{
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadPageMargins(t,l, oWorksheet.PagePrintOptions.pageMargins);
			});
		}
		else if ( c_oSerWorksheetsTypes.PageSetup == type )
		{
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadPageSetup(t,l, oWorksheet.PagePrintOptions.pageSetup);
			});
		}
		else if ( c_oSerWorksheetsTypes.PrintOptions == type )
		{
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadPrintOptions(t,l, oWorksheet.PagePrintOptions);
			});
		}
		else if ( c_oSerWorksheetsTypes.Hyperlinks == type )
		{
			res = this.bcr.Read1(length, function(t,l){
				return oThis.ReadHyperlinks(t,l, oWorksheet);
			});
		}
		else if ( c_oSerWorksheetsTypes.MergeCells == type )
		{
			res = this.bcr.Read1(length, function(t,l){
				return oThis.ReadMergeCells(t,l, oWorksheet);
			});
		}
		else if ( c_oSerWorksheetsTypes.SheetData == type )
		{
			this.oReadResult.sheetData.push({ws: oWorksheet, pos: this.stream.GetCurPos(), len: length});
			res = c_oSerConstants.ReadUnknown;
		}
		else if ( c_oSerWorksheetsTypes.Drawings == type )
		{
			res = this.bcr.Read1(length, function(t,l){
				return oThis.ReadDrawings(t,l, oWorksheet.Drawings, oWorksheet);
			});
		}
		else if ( c_oSerWorksheetsTypes.Autofilter == type )
		{
			oBinary_TableReader = new Binary_TableReader(this.stream, this.oReadResult, oWorksheet, this.Dxfs);
			oWorksheet.AutoFilter = new AscCommonExcel.AutoFilter();
			res = this.bcr.Read1(length, function(t,l){
				return oBinary_TableReader.ReadAutoFilter(t,l, oWorksheet.AutoFilter);
			});
		} else if (c_oSerWorksheetsTypes.SortState === type) {
			oBinary_TableReader = new Binary_TableReader(this.stream, this.oReadResult, oWorksheet, this.Dxfs);
			oWorksheet.sortState = new AscCommonExcel.SortState();
			res = this.bcr.Read1(length, function(t, l) {
				return oBinary_TableReader.ReadSortState(t, l, oWorksheet.sortState);
			});
		} else if (c_oSerWorksheetsTypes.TableParts == type) {
			oBinary_TableReader = new Binary_TableReader(this.stream, this.oReadResult, oWorksheet, this.Dxfs);
			oBinary_TableReader.Read(length, oWorksheet.TableParts);
		} else if ( c_oSerWorksheetsTypes.Comments == type
			&& !(typeof editor !== "undefined" && editor.WordControl && editor.WordControl.m_oLogicDocument && Array.isArray(editor.WordControl.m_oLogicDocument.Slides))) {
			res = this.bcr.Read1(length, function(t,l){
				return oThis.ReadComments(t,l, oWorksheet);
			});
		} else if (c_oSerWorksheetsTypes.ConditionalFormatting === type && typeof AscCommonExcel.CConditionalFormatting != "undefined") {
			oConditionalFormatting = new AscCommonExcel.CConditionalFormatting();
			res = this.bcr.Read1(length, function (t, l) {
				return oThis.ReadConditionalFormatting(t, l, oConditionalFormatting);
			});
			if (oConditionalFormatting.isValid()) {
				oConditionalFormatting.initRules();
				oWorksheet.aConditionalFormattingRules =
					oWorksheet.aConditionalFormattingRules.concat(oConditionalFormatting.aRules);
			}
		} else if (c_oSerWorksheetsTypes.SheetViews === type) {
			res = this.bcr.Read1(length, function (t, l) {
				return oThis.ReadSheetViews(t, l, oWorksheet.sheetViews);
			});
		} else if (c_oSerWorksheetsTypes.SheetPr === type) {
			oWorksheet.sheetPr = new AscCommonExcel.asc_CSheetPr();
			res = this.bcr.Read1(length, function (t, l) {
				return oThis.ReadSheetPr(t, l, oWorksheet.sheetPr);
			});
		} else if (c_oSerWorksheetsTypes.SparklineGroups === type) {
			res = this.bcr.Read1(length, function (t, l) {
				return oThis.ReadSparklineGroups(t, l, oWorksheet);
			});
		} else if (c_oSerWorksheetsTypes.HeaderFooter === type) {
			res = this.bcr.Read1(length, function(t, l) {
				return oThis.ReadHeaderFooter(t, l, oWorksheet.headerFooter);
			});
			// } else if (c_oSerWorksheetsTypes.RowBreaks === type) {
			//     oWorksheet.rowBreaks = {count: null, manualBreakCount: null, breaks: []};
			//     res = this.bcr.Read1(length, function (t, l) {
			//         return oThis.ReadRowColBreaks(t, l, oWorksheet.rowBreaks);
			//     });
			// } else if (c_oSerWorksheetsTypes.ColBreaks === type) {
			//     oWorksheet.colBreaks = {count: null, manualBreakCount: null, breaks: []};
			//     res = this.bcr.Read1(length, function (t, l) {
			//         return oThis.ReadRowColBreaks(t, l, oWorksheet.colBreaks);
			//     });
			// } else if (c_oSerWorksheetsTypes.LegacyDrawingHF === type) {
			//     oWorksheet.legacyDrawingHF = {
			//         drawings: [], cfe: null, cff: null, cfo: null, che: null, chf: null, cho: null, lfe: null,
			//         lff: null, lfo: null, lhe: null, lhf: null, lho: null, rfe: null, rff: null, rfo: null, rhe: null,
			//         rhf: null, rho: null
			//     };
			//     res = this.bcr.Read1(length, function (t, l) {
			//         return oThis.ReadLegacyDrawingHF(t, l, oWorksheet.legacyDrawingHF);
			//     });
			// } else if (c_oSerWorksheetsTypes.Picture === type) {
			//     oWorksheet.picture = this.stream.GetString2LE(length);
		} else if (c_oSerWorksheetsTypes.DataValidations === type && typeof AscCommonExcel.CDataValidations != "undefined") {
			oWorksheet.dataValidations = new AscCommonExcel.CDataValidations();
			res = this.bcr.Read1(length, function(t, l) {
				return oThis.ReadDataValidations(t, l, oWorksheet.dataValidations);
			});
		} else if (c_oSerWorksheetsTypes.PivotTable === type && typeof Asc.CT_pivotTableDefinition != "undefined") {
			var data = {table: null, cacheId: null};
			res = this.bcr.Read1(length, function(t, l) {
				return oThis.ReadPivotCopyPaste(t, l, data);
			});
			var cacheDefinition = this.oReadResult.pivotCacheDefinitions[data.cacheId];
			if(data.table && cacheDefinition){
				data.table.cacheDefinition = cacheDefinition;
				oWorksheet.insertPivotTable(data.table);
			}
		} else if (c_oSerWorksheetsTypes.Slicers === type || c_oSerWorksheetsTypes.SlicersExt === type) {
			res = this.bcr.Read1(length, function(t, l) {
				return oThis.ReadSlicers(t, l, oWorksheet);
			});
		} else if (c_oSerWorksheetsTypes.NamedSheetView === type) {
			var namedSheetViews = Asc.CT_NamedSheetViews ? new Asc.CT_NamedSheetViews() : null;
			if (namedSheetViews) {
				var fileStream = this.stream.ToFileStream();
				fileStream.GetUChar();
				namedSheetViews.fromStream(fileStream, this.wb);
				oWorksheet.aNamedSheetViews = namedSheetViews.namedSheetView;
				this.stream.FromFileStream(fileStream);
			} else {
				res = c_oSerConstants.ReadUnknown;
			}
		} else if (c_oSerWorksheetsTypes.ProtectionSheet === type && typeof Asc.CSheetProtection != "undefined") {
			var sheetProtection = Asc.CSheetProtection ? new Asc.CSheetProtection(oWorksheet) : null;
			if (sheetProtection) {
				oWorksheet.sheetProtection = sheetProtection;
				res = this.bcr.Read2Spreadsheet(length, function(t,l){
					return oThis.ReadSheetProtection(t,l, oWorksheet.sheetProtection);
				});
			} else {
				res = c_oSerConstants.ReadUnknown;
			}
		} else if (c_oSerWorksheetsTypes.ProtectedRanges === type) {
			res = this.bcr.Read1(length, function(t, l) {
				return oThis.ReadProtectedRanges(t, l, oWorksheet.aProtectedRanges);
			});
		} else
			res = c_oSerConstants.ReadUnknown;*/

		var t = this;
		if ("worksheet" === reader.GetNameNoNS()) {
			var context = reader.GetContext();
			context.initFromWS(this);
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("cols" === name) {
					var cols = new CT_Cols(this);
					cols.fromXml(reader);
					var aTempCols = cols.val;

					//TODO дублирую из serialize
					//если есть стиль последней колонки, назначаем его стилем всей таблицы и убираем из колонок
					var oAllCol = null;
					if (aTempCols.length > 0) {
						var oLast = aTempCols[aTempCols.length - 1];
						if (AscCommon.gc_nMaxCol === oLast.Max) {
							oAllCol = this.getAllCol();
							oLast.col.cloneTo(oAllCol);
						}
					}
					for (var i = 0; i < aTempCols.length; ++i) {
						var elem = aTempCols[i];
						if (elem.Max >= this.nColsCount) {
							this.nColsCount = elem.Max;
						}
						if (null != oAllCol && oAllCol.isEqual(elem.col)) {
							continue;
						}

						for (var j = elem.Min; j <= elem.Max; j++) {
							var oNewCol = new AscCommonExcel.Col(this, j - 1);
							elem.col.cloneTo(oNewCol);
							this.aCols[oNewCol.index] = oNewCol;
						}
					}

				} else if ("dimension" === name) {
					//do not support serialize
				} else if ("drawing" === name) {
					var drawing = new AscCommonExcel.CT_DrawingWSRef();
					drawing.fromXml(reader);
					context.drawingId = drawing.id;
				} else if ("hyperlinks" === name) {

					//TODO
					/*if ( c_oSerHyperlinkTypes.Hyperlink == type )
						oHyperlink.Hyperlink = this.stream.GetString2LE(length);*/

					var hyperlinks = [];
					var depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						var name2 = reader.GetNameNoNS();
						if ("hyperlink" === name2) {
							var hyperlink = new AscCommonExcel.Hyperlink();
							hyperlink.fromXml(reader, this);
							hyperlinks.push(hyperlink);
						}
					}

					//TODO в serialize аналогичная обработка в ReadWorksheetsContent
					for (var i = 0; i < hyperlinks.length; ++i) {
						if (null !== hyperlink.Ref) {
							hyperlinks[i].Ref.setHyperlinkOpen(hyperlinks[i]);
						}
					}
				} else if ("mergeCells" === name) {
					var aMerged = getSimpleArrayFromXml(reader, "mergeCell", "ref");
					if (aMerged) {
						//TODO в serialize аналогичная обработка в ReadWorksheetsContent
						this.mergeManager.initData = aMerged.slice();
					}
					//this.aMerged.push(this.stream.GetString2LE(length));
				} else if ("pageMargins" === name) {
					if (this.PagePrintOptions && this.PagePrintOptions.pageMargins) {
						this.PagePrintOptions.pageMargins.fromXml(reader);
					}
				} else if ("pageSetup" === name) {
					if (this.PagePrintOptions && this.PagePrintOptions.pageSetup) {
						this.PagePrintOptions.pageSetup.fromXml(reader);
					}
				}  else if ("printOptions" === name) {
					if (this.PagePrintOptions) {
						this.PagePrintOptions.fromXml(reader);
					}
				} else if ("sheetData" === name) {
					/*var sheetData = new AscCommonExcel.CT_SheetData(this);
					sheetData.fromXml(reader);*/
					context.InitOpenManager.oReadResult.sheetData.push({ws: this, reader: reader, state: reader.getState()});
				} else if ("WorksheetOptions" === name) {
					//do not support serialize
				} else if ("Names" === name) {
					//TODO
					//do not support serialize
					//def names
				} else if ("sheetPr" === name) {
					this.sheetPr = new AscCommonExcel.asc_CSheetPr();
					this.sheetPr.fromXml(reader);
				} else if ("autoFilter" === name) {
					var autoFilter = new AscCommonExcel.AutoFilter();
					autoFilter.fromXml(reader);
					this.AutoFilter = autoFilter;
				} else if ("legacyDrawing" === name) {
					//do not support serialize
				} else if ("legacyDrawingHF" === name) {
					//do not support serialize - commented
				} else if ("oleObjects" === name) {
					//do not support serialize
				} else if ("controls" === name) {
					//do not support serialize
				} else if ("headerFooter" === name) {
					if (this.headerFooter) {
						this.headerFooter.fromXml(reader);
					}
				} else if ("dataValidations" === name) {
					var dataValidations = new AscCommonExcel.CDataValidations();
					dataValidations.fromXml(reader);
					this.dataValidations = dataValidations;
				} else if ("dataConsolidate" === name) {

				} else if ("conditionalFormatting" === name && typeof AscCommonExcel.CConditionalFormatting != "undefined") {
					var oConditionalFormatting = new AscCommonExcel.CConditionalFormatting();
					oConditionalFormatting.fromXml(reader);
					if (oConditionalFormatting.isValid()) {
						oConditionalFormatting.initRules();
						this.aConditionalFormattingRules = this.aConditionalFormattingRules.concat(oConditionalFormatting.aRules);
					}
				} else if ("sheetFormatPr" === name) {
					//SheetFormatPr
					if (this.oSheetFormatPr) {
						this.oSheetFormatPr.fromXml(reader, this);
					}
				} else if ("sheetViews" === name) {
					reader.readXmlArray("sheetView", function (index) {
						if (index === 0) {
							var sheetViewSettings = new AscCommonExcel.asc_CSheetViewSettings();
							sheetViewSettings.fromXml(reader, t);
							t.sheetViews.push(sheetViewSettings);
						}
					});
				} else if ("protectedRanges" === name) {
					reader.readXmlArray("protectedRange", function () {
						var oProtectedRange = Asc.CProtectedRange ? new Asc.CProtectedRange() : null;
						if (oProtectedRange) {
							oProtectedRange.fromXml(reader);
							t.aProtectedRanges.push(oProtectedRange);
						}
					});
				} else if ("sortState" === name) {
					var sortState = new AscCommonExcel.SortState();
					sortState.fromXml(reader);
					this.SortState = sortState;
				} else if ("extLst" === name) {

					/*virtual void fromXML(XmlUtils::CXmlLiteReader& oReader)
					{
						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
							if ( _T("ext") == sName )
							{
								OOX::Drawing::COfficeArtExtension *oExt = new OOX::Drawing::COfficeArtExtension(oReader);
								if (oExt) m_arrExt.push_back( oExt );
							}
						}
					}*/

					var extLst = new COfficeArtExtensionList(this);
					extLst.fromXml(reader);
				} else if ("picture" === name) {
					//do not support serialize - commented
				} else if ("rowBreaks" === name) {
					//do not support serialize - commented
				}  else if ("colBreaks" === name) {
					//do not support serialize - commented
				} else if ("sheetProtection" === name) {
					var sheetProtection = Asc.CSheetProtection ? new Asc.CSheetProtection(this) : null;
					if (sheetProtection) {
						sheetProtection.fromXml(reader);
						this.sheetProtection = sheetProtection;
					}
				}
			}
		}

		this.PrepareDataValidations(extLst);
	};
	AscCommonExcel.Worksheet.prototype.toXml = function (writer) {
		var t = this;
		var context = writer.context;
		writer.WriteXmlString("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
		writer.WriteXmlNodeStart("worksheet");
		writer.WriteXmlString(
			' xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"');
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlString('<dimension ref="A1"/>');
		writer.WriteXmlString('<sheetViews><sheetView tabSelected="1" workbookViewId="0"/></sheetViews>');
		writer.WriteXmlString('<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>');
		writer.WriteXmlNodeStart('sheetData');
		writer.WriteXmlAttributesEnd();
		this.toXmlSheetData(writer);
		writer.WriteXmlNodeEnd("sheetData");
		if (this.Drawings.length > 0) {
			var drawing = new AscCommonExcel.CT_DrawingWS(t);
			var drawingPart = context.part.addPart(AscCommon.openXml.Types.drawings);
			drawingPart.part.setDataXml(drawing, writer);
			var drawingRef = new AscCommonExcel.CT_DrawingWSRef();
			drawingRef.id = drawingPart.rId;
			drawingRef.toXml(writer, "drawing");
		}


		/*if(m_arrItems.empty()) return;

		writer.WriteString(L"<tableParts");
		WritingStringAttrInt(L"count", (int)m_arrItems.size());
		writer.WriteString(L">");

		for ( size_t i = 0; i < m_arrItems.size(); ++i)
		{
			if ( m_arrItems[i] )
			{
				m_arrItems[i]->toXML(writer);
			}
		}

		writer.WriteString(L"</tableParts>");*/


		if (this.dataValidations) {
			this.dataValidations.toXml(writer);
		}
		if (this.TableParts && this.TableParts.length > 0) {

			writer.WriteXmlNodeStart("tableParts");
			writer.WriteXmlAttributeNumber("count", this.TableParts.length);
			writer.WriteXmlAttributesEnd();

			for (var i = 0; i < this.TableParts.length; i++) {
				var tablePart = context.part.addPart(AscCommon.openXml.Types.tableDefinition);
				tablePart.part.setDataXml(this.TableParts[i], writer);
				//CT_DrawingWSRef - внутри только id, поэтому здесь использую. либо переимонвать, либо базовый сделать с такими аттрибутами
				var tableRef = new AscCommonExcel.CT_DrawingWSRef();
				tableRef.id = tablePart.rId;
				tableRef.toXml(writer, "tablePart");
			}

			writer.WriteXmlNodeEnd("tableParts");
		}
		writer.WriteXmlNodeEnd("worksheet");
	};

	Asc.asc_CDefName.prototype.toXml = function (writer) {

		/* writer.WriteString(L"<definedName");
						WritingStringNullableAttrEncodeXmlString(L"name", m_oName, *m_oName);
						WritingStringNullableAttrInt(L"localSheetId", m_oLocalSheetId, m_oLocalSheetId->GetValue());
						WritingStringNullableAttrBool(L"hidden", m_oHidden);
						writer.WriteString(L">");
						if(m_oRef.IsInit())
							writer.WriteEncodeXmlString(*m_oRef);
						writer.WriteString(L"</definedName>");*/

		writer.WriteXmlString("<definedName");
		writer.WriteXmlNullableAttributeStringEncode("name", this.Name);
		writer.WriteXmlNullableAttributeNumber("localSheetId", this.LocalSheetId);
		writer.WriteXmlNullableAttributeBool("hidden", this.Hidden);
		writer.WriteXmlString(">");
		if (this.Ref) {
			writer.WriteXmlStringEncode(this.Ref);
		}
		writer.WriteXmlString("</definedName>");
	};

	Asc.asc_CDefName.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						m_oRef = oReader.GetText3();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		this.Ref = reader.GetText();
	};

	Asc.asc_CDefName.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Start( oReader )
						WritingElement_ReadAttributes_Read_if     ( oReader, L"comment",		m_oComment )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"customMenu",		m_oCustomMenu )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"description",	m_oDescription )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"function",		m_oFunction )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"functionGroupId",m_oFunctionGroupId )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"help",			m_oHelp )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"hidden",			m_oHidden )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"localSheetId",	m_oLocalSheetId )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"name",			m_oName )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"publishToServer",m_oPublishToServer )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"shortcutKey ",	m_oShortcutKey  )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"statusBar",		m_oStatusBar  )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"vbProcedure",	m_oVbProcedure  )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"workbookParameter",	m_oWorkbookParameter  )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"xlm",			m_oXlm  )

						WritingElement_ReadAttributes_Read_else_if( oReader, L"ss:Name",		m_oName )
						WritingElement_ReadAttributes_Read_else_if( oReader, L"ss:RefersTo",	oRefersTo )*/

//serialize
		/* var res = c_oSerConstants.ReadOk;
					if ( c_oSerDefinedNameTypes.Name == type )
						oDefinedName.Name = this.stream.GetString2LE(length);
					else if ( c_oSerDefinedNameTypes.Ref == type )
						oDefinedName.Ref = this.stream.GetString2LE(length);
					else if ( c_oSerDefinedNameTypes.LocalSheetId == type )
						oDefinedName.LocalSheetId = this.stream.GetULongLE();
					else if ( c_oSerDefinedNameTypes.Hidden == type )
						oDefinedName.Hidden = this.stream.GetBool();
					else
						res = c_oSerConstants.ReadUnknown;
					return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			/*if ("comment" === reader.GetName()) {
				val = reader.GetValue();
				this.comment = val;
			} else if ("customMenu" === reader.GetName()) {
				val = reader.GetValue();
				this.customMenu = val;
			} else if ("description" === reader.GetName()) {
				val = reader.GetValue();
				this.description = val;
			} else if ("function" === reader.GetName()) {
				val = reader.GetValue();
				this.function = val;
			} else if ("functionGroupId" === reader.GetName()) {
				val = reader.GetValue();
				this.functionGroupId = val;
			} else if ("help" === reader.GetName()) {
				val = reader.GetValue();
				this.help = val;
			} else*/
			if ("hidden" === reader.GetName()) {
				val = reader.GetValueBool();
				this.Hidden = val;
			} else if ("localSheetId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.LocalSheetId = val;
			} else if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.Name = val;
			} /*else if ("publishToServer" === reader.GetName()) {
				val = reader.GetValue();
				this.PublishToServer = val;
			} else if ("shortcutKey " === reader.GetName()) {
				val = reader.GetValue();
				this.ShortcutKey  = val;
			} else if ("statusBar" === reader.GetName()) {
				val = reader.GetValue();
				this.StatusBar = val;
			} else if ("vbProcedure" === reader.GetName()) {
				val = reader.GetValue();
				this.VbProcedure = val;
			} else if ("workbookParameter" === reader.GetName()) {
				val = reader.GetValue();
				this.WorkbookParameter = val;
			} else if ("xlm" === reader.GetName()) {
				val = reader.GetValue();
				this.Xlm = val;
			} else if ("ss:Name" === reader.GetName()) {
				val = reader.GetValue();
				this.Ss:Name = val;
			} else if ("ss:RefersTo" === reader.GetName()) {
				val = reader.GetValue();
				this.Ss:RefersTo = val;
			}*/
		}
	};


	function CT_Cols(ws, aCellXfs) {
		this.val = [];
		this.ws = ws;
		this.aCellXfs = aCellXfs;
	}

	CT_Cols.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( _T("col") == sName )
							{
								CCol *pCol = new CCol(m_pMainDocument);
								pCol->fromXML(oReader);

								m_arrItems.push_back(pCol);
							}
						}*/

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("col" === name) {

				/*WritingStringNullableAttrBool(L"bestFit", m_oBestFit);
				WritingStringNullableAttrBool(L"collapsed", m_oCollapsed);
				WritingStringNullableAttrBool(L"customWidth", m_oCustomWidth);
				WritingStringNullableAttrBool(L"hidden", m_oHidden);
				WritingStringNullableAttrInt(L"min", m_oMin, m_oMin->GetValue());
				WritingStringNullableAttrInt(L"max", m_oMax, m_oMax->GetValue());
				WritingStringNullableAttrInt(L"outlineLevel", m_oOutlineLevel, m_oOutlineLevel->GetValue());
				WritingStringNullableAttrBool(L"phonetic", m_oPhonetic);
				WritingStringNullableAttrInt(L"style", m_oStyle, m_oStyle->GetValue());
				WritingStringNullableAttrDouble(L"width", m_oWidth, m_oWidth->GetValue());*/


				/*if ( c_oSerWorksheetColTypes.BestFit == type )
					oTempCol.col.BestFit = this.stream.GetBool();
				else if ( c_oSerWorksheetColTypes.Hidden == type )
					oTempCol.col.setHidden(this.stream.GetBool());
				else if ( c_oSerWorksheetColTypes.Max == type )
					oTempCol.Max = this.stream.GetULongLE();
				else if ( c_oSerWorksheetColTypes.Min == type )
					oTempCol.Min = this.stream.GetULongLE();
				else if (c_oSerWorksheetColTypes.Style == type) {
					var xfs = aCellXfs[this.stream.GetULongLE()];
					if (xfs) {
						oTempCol.col.setStyle(xfs);
					}
				} else if ( c_oSerWorksheetColTypes.Width == type )
					oTempCol.col.width = this.stream.GetDoubleLE();
				else if ( c_oSerWorksheetColTypes.CustomWidth == type )
					oTempCol.col.CustomWidth = this.stream.GetBool();
				else if ( c_oSerWorksheetColTypes.OutLevel == type )
					oTempCol.col.outlineLevel = this.stream.GetULongLE();
				else if ( c_oSerWorksheetColTypes.Collapsed == type )
					oTempCol.col.collapsed = this.stream.GetBool();*/


				var oTempCol = {Max: null, Min: null, col: new AscCommonExcel.Col(this.ws, 0)};
				var val;
				while (reader.MoveToNextAttribute()) {
					if ("bestFit" === reader.GetName()) {
						val = reader.GetValueBool();
						oTempCol.col.BestFit = val;
					} else if ("collapsed" === reader.GetName()) {
						val = reader.GetValueBool();
						oTempCol.col.collapsed = val;
					} else if ("customWidth" === reader.GetName()) {
						val = reader.GetValueBool();
						oTempCol.col.CustomWidth = val;
					} else if ("hidden" === reader.GetName()) {
						val = reader.GetValueBool();
						oTempCol.col.setHidden(val);
					}  else if ("min" === reader.GetName()) {
						val = reader.GetValueInt();
						oTempCol.Min = val;
					}  else if ("max" === reader.GetName()) {
						val = reader.GetValueInt();
						oTempCol.Max = val;
					}  else if ("outlineLevel" === reader.GetName()) {
						val = reader.GetValueInt();
						oTempCol.col.outlineLevel = val;
					} /*else if ("phonetic" === reader.GetName()) {
						val = reader.GetValueBool();
						oTempCol.col.phonetic = val;
					}*/ else if ("style" === reader.GetName()) {
						var xfs = this.aCellXfs[reader.GetValueInt()];
						if (xfs) {
							oTempCol.col.setStyle(xfs);
						}
					} else if ("width" === reader.GetName()) {
						val = reader.GetValueInt();
						oTempCol.col.width = val;
					}
				}
				this.val.push(oTempCol);
			}
		}
	};


	AscCommonExcel.Worksheet.prototype.toXmlSheetData = function (writer) {
		var ws = this;
		var context = writer.context;
		var isCopyPaste = context.isCopyPaste;
		var range;
		if (isCopyPaste) {
			range = ws.getRange3(isCopyPaste.r1, isCopyPaste.c1, isCopyPaste.r2, isCopyPaste.c2);
		} else {
			range = ws.getRange3(0, 0, AscCommon.gc_nMaxRow0, AscCommon.gc_nMaxCol0);
		}
		var isFirstRow = true;
		var writeEndRow = function(){
			if (isFirstRow) {
				isFirstRow = false;
			} else {
				writer.WriteXmlNodeEnd("row");
			}
		};


		var curRow = -1;
		var allRow = ws.getAllRowNoEmpty();
		var tempRow = new AscCommonExcel.Row(ws);
		if (allRow) {
			tempRow.copyFrom(allRow);
		}
		range._foreachRowNoEmpty(function(row, excludedCount) {
			writeEndRow();
			row.toXml(writer);
			curRow = row.getIndex();
		}, function(cell, nRow0, nCol0, nRowStart0, nColStart0, excludedCount) {
			if (curRow != nRow0) {
				tempRow.setIndex(nRow0);
				writeEndRow();
				tempRow.toXml(writer);
				curRow = tempRow.getIndex();
			}
			//сохраняем как и Excel даже пустой стиль(нужно чтобы убрать стиль строки/колонки)
			if (null != cell.xfs || false == cell.isNullText()) {
				cell.toXml(writer);
			}
		}, (ws.bExcludeHiddenRows && isCopyPaste));
		writeEndRow();
	};
	AscCommonExcel.Worksheet.prototype.PrepareDataValidations = function (extLst) {

		if (extLst) {
			for (var i = 0; i < extLst.arrExt.length; i++) {
				if (extLst.arrExt[i] && extLst.arrExt[i].dataValidations) {
					//TODO обрабатываю только ситуацию, когад 1 элумент. несколько элементов не встречал, но нужно будет проверить и обработать.
					for (var j = 0; j < extLst.arrExt[i].dataValidations.length; j++) {
						if (this.dataValidations) {

						} else {
							this.dataValidations = extLst.arrExt[i].dataValidations[j];
						}
					}
				}
			}
		}


		/*if (m_oExtLst.IsInit() == false) return;

		for (size_t i = 0; i < m_oExtLst->m_arrExt.size(); ++i)
		{
			if (false == m_oExtLst->m_arrExt[i]->m_oDataValidations.IsInit()) continue;

			for (size_t j = 0; j < m_oExtLst->m_arrExt[i]->m_oDataValidations->m_arrItems.size(); ++j)
			{
				if (NULL == m_oExtLst->m_arrExt[i]->m_oDataValidations->m_arrItems[j]) continue;

				if (false == m_oDataValidations.IsInit())
				{
					m_oDataValidations.Init();
					m_oDataValidations->m_oDisablePrompts = m_oExtLst->m_arrExt[i]->m_oDataValidations->m_oDisablePrompts;
					m_oDataValidations->m_oXWindow = m_oExtLst->m_arrExt[i]->m_oDataValidations->m_oXWindow;
					m_oDataValidations->m_oYWindow = m_oExtLst->m_arrExt[i]->m_oDataValidations->m_oYWindow;
				}
				m_oDataValidations->m_arrItems.push_back(m_oExtLst->m_arrExt[i]->m_oDataValidations->m_arrItems[j]);
				m_oExtLst->m_arrExt[i]->m_oDataValidations->m_arrItems[j] = NULL;
			}
		}*/
	};

	AscCommonExcel.Row.prototype.toXml = function(writer) {
		var context = writer.context;
		var s = context.stylesForWrite.add(this.xfs) || null;
		var outlineLevel = this.outlineLevel > 0 ? this.outlineLevel : null;

		writer.WriteXmlNodeStart("row");
		writer.WriteXmlAttributeNumber("r", this.index+1);
		writer.WriteXmlNullableAttributeNumber("s", s);
		writer.WriteXmlNullableAttributeNumber("ht", this.h);
		writer.WriteXmlAttributeBoolIfTrue("hidden", this.getHidden());
		writer.WriteXmlAttributeBoolIfTrue("customHeight", this.getCustomHeight());
		writer.WriteXmlNullableAttributeNumber("outlineLevel", outlineLevel);
		writer.WriteXmlAttributeBoolIfTrue("collapsed", this.getCollapsed());
		writer.WriteXmlAttributesEnd();
	};
	AscCommonExcel.Cell.prototype.fromXml = function(reader) {
		this.readAttr(reader);

		var value = reader.GetContext().cellValue;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			if ("v" === reader.GetName()) {
				value.fromXml(reader);
				if (CellValueType.String === this.type) {
					var ss = reader.GetContext().sharedStrings[parseInt(value.val)];
					if (undefined !== ss) {
						if (typeof ss === 'string') {
							this.setValueTextInternal(ss);
						} else {
							this.setValueMultiTextInternal(ss);
						}
					}
				} else if (CellValueType.Error === this.type) {
					this.setValueTextInternal(value.val);
				} else {
					this.setValueNumberInternal(parseFloat(value.val));
				}
			} else if ("f" === reader.GetName()) {
				var val = reader.GetContext().InitOpenManager.tmp && reader.GetContext().InitOpenManager.tmp.formula;
				val.fromXml(reader);
			}
		}
	};
	AscCommonExcel.Cell.prototype.readAttr = function(reader) {
		var val;
		var cellBase = reader.GetContext().cellBase;
		while (reader.MoveToNextAttribute()) {
			if ("r" === reader.GetName()) {
				val = reader.GetValue();
				cellBase.fromRefA1(val);
				this.setRowCol(cellBase.row, cellBase.col);
				this.ws.nRowsCount = Math.max(this.ws.nRowsCount, this.nRow);
				this.ws.nColsCount = Math.max(this.ws.nColsCount, this.nCol);
				this.ws.cellsByColRowsCount = Math.max(this.ws.cellsByColRowsCount, this.nCol);
			} else if ("s" === reader.GetName()) {
				var nStyleIndex = reader.GetValueInt();
				if (0 != nStyleIndex) {
					var xfs = reader.GetContext().InitOpenManager.aCellXfs[nStyleIndex];
					if (null != xfs) {
						this.setStyle(xfs);
					}
				}
			} else if ("t" === reader.GetName()) {
				val = reader.GetValue();
				switch(val) {
					case "s":
						this.type = CellValueType.String;
						break;
					case "str":
						this.type = CellValueType.String;
						break;
					case "n":
						this.type = CellValueType.Number;
						break;
					case "e":
						this.type = CellValueType.Error;
						break;
					case "b":
						this.type = CellValueType.Bool;
						break;
					case "inlineStr":
						this.type = CellValueType.String;
						break;
					case "d":
						this.type = CellValueType.String;
						break;
				}
			}
		}
	};
	AscCommonExcel.Cell.prototype.toXml = function(writer) {
		var context = writer.context;
		var ws = this.ws;
		var ref = AscCommon.CellBase.prototype.toRefA1(this.nRow, this.nCol);
		var s = context.stylesForWrite.add(this.xfs) || null;
		var formulaToWrite = null;
		if (this.isFormula() && !(context.isCopyPaste && ws.bIgnoreWriteFormulas)) {
			formulaToWrite = ws.PrepareFormulaToWrite(this);
		}
		var text = null;
		var number = null;
		var type = null;
		switch (this.type) {
			case CellValueType.String:
				type = "s";
				if (formulaToWrite) {
					text = this.text;
				} else {
					var textIndex = this.getTextIndex();
					if (null !== textIndex) {
						var index = context.oSharedStrings.strings[textIndex];
						if (undefined === index) {
							index = context.oSharedStrings.index++;
							context.oSharedStrings.strings[textIndex] = index;
						}
						number = index;
					}
				}
				break;
			case CellValueType.Error:
				type = "e";
				text = this.text;
				break;
			case CellValueType.Bool:
				type = "b";
				number = this.number;
				break;
			default:
				number = this.number;
				break;
		}
		writer.WriteXmlNodeStart("c");
		writer.WriteXmlAttributeString("r", ref);
		writer.WriteXmlNullableAttributeNumber("s", s);
		writer.WriteXmlNullableAttributeString("t", type);
		if (!this.isNullText()) {
			writer.WriteXmlAttributesEnd();
			writer.WriteXmlNullableValueString("f", formulaToWrite);
			if(null !== text) {
				writer.WriteXmlValueString("v", text);
			} else if(null !== number) {
				writer.WriteXmlValueNumber("v", number);
			}
			writer.WriteXmlNodeEnd("c");

		} else {
			writer.WriteXmlAttributesEnd(true);
		}
	};
	AscCommonExcel.OpenFormula.prototype.fromXml = function(reader) {
		this.readAttr(reader);
		this.v = reader.GetText();
	};
	AscCommonExcel.OpenFormula.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("aca" === reader.GetName()) {
				this.aca = reader.GetValueBool();
			} else if ("bx" === reader.GetName()) {
				this.bx = reader.GetValueBool();
			} else if ("ca" === reader.GetName()) {
				this.ca = reader.GetValueBool();
			} else if ("del1" === reader.GetName()) {
				this.del1 = reader.GetValueBool();
			} else if ("del2" === reader.GetName()) {
				this.del2 = reader.GetValueBool();
			} else if ("dt2D" === reader.GetName()) {
				this.dt2d = reader.GetValueBool();
			} else if ("dtr" === reader.GetName()) {
				this.dtr = reader.GetValueBool();
			} else if ("r1" === reader.GetName()) {
				this.r1 = reader.GetValue();
			} else if ("r2" === reader.GetName()) {
				this.r2 = reader.GetValue();
			} else if ("ref" === reader.GetName()) {
				this.ref = reader.GetValue();
			} else if ("si" === reader.GetName()) {
				this.si = reader.GetValueInt();
			} else if ("t" === reader.GetName()) {
				val = reader.GetValue();

				/*<xsd:restriction base="xsd:string">
					2323 <xsd:enumeration value="normal"/>
					2324 <xsd:enumeration value="array"/>
					2325 <xsd:enumeration value="dataTable"/>
					2326 <xsd:enumeration value="shared"/>
					2327 </xsd:restriction>*/

				if (val === "array") {
					this.t = window["Asc"].ECellFormulaType.cellformulatypeArray;
				} else if (val === "shared") {
					this.t = window["Asc"].ECellFormulaType.cellformulatypeShared;
				} else if (val === "dataTable") {
					this.t = window["Asc"].ECellFormulaType.cellformulatypeDataTable;
				} else {
					this.t = window["Asc"].ECellFormulaType.cellformulatypeNormal;
				}
			}
		}
	};


	function CT_DrawingWS(ws) {
		this.ws = ws;
		this.anchors = [];
	}

	CT_DrawingWS.prototype.fromXml = function (reader) {
		if (!reader.ReadNextNode()) {
			return;
		}
		if ("wsDr" !== reader.GetNameNoNS()) {
			if (!reader.ReadNextNode()) {
				return;
			}
		}
		var objectRender = new AscFormat.DrawingObjects();
		if ("wsDr" === reader.GetNameNoNS()) {
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("twoCellAnchor" === name) {
					var drawing = objectRender.createDrawingObject();
					drawing.fromXml(reader);
				} else if ("oneCellAnchor" === name) {
				} else if ("absoluteAnchor" === name) {
				}
			}
		}
	};
	CT_DrawingWS.prototype.toXml = function (writer) {
		writer.WriteXmlString('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
		writer.WriteXmlNodeStart("xdr:wsDr");
		writer.WriteXmlString(' xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"');
		writer.WriteXmlAttributesEnd();
		this.ws.Drawings.forEach(function(drawing) {
			drawing.toXml(writer);
		});
		writer.WriteXmlNodeEnd("xdr:wsDr");
	};
	function CT_SharedStrings() {
		this.sharedStrings = [];
	}
	CT_SharedStrings.prototype.initFromMap = function(wb, oSharedStrings) {
		for (var i in oSharedStrings.strings) {
			if (oSharedStrings.strings.hasOwnProperty(i)){
				var from = parseInt(i);
				var to = oSharedStrings.strings[i];
				this.sharedStrings[to] = wb.sharedStrings.get(from);
			}
		}
	};
	CT_SharedStrings.prototype.fromXml = function(reader) {
		if (!reader.ReadNextNode()) {
			return;
		}
		if ("sst" !== reader.GetNameNoNS()) {
			if (!reader.ReadNextNode()) {
				return;
			}
		}
		var si = new CT_Si();
		if ("sst" === reader.GetNameNoNS()) {
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("si" === name) {
					si.clean();
					si.fromXml(reader);
					if (null !== si.text) {
						this.sharedStrings.push(si.text);
					} else if (null !== si.multiText) {
						this.sharedStrings.push(si.multiText);
					} else {
						this.sharedStrings.push("");
					}
				}
			}
		}
		reader.GetContext().sharedStrings = this.sharedStrings;
	};
	CT_SharedStrings.prototype.toXml = function(writer) {
		writer.WriteXmlString('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
		writer.WriteXmlNodeStart("sst");
		writer.WriteXmlString(' xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"');
		writer.WriteXmlAttributeNumber("count", this.sharedStrings.length);
		writer.WriteXmlAttributeNumber("uniqueCount", this.sharedStrings.length);
		writer.WriteXmlAttributesEnd();

		var si = new CT_Si();
		this.sharedStrings.forEach(function(elem) {
			si.clean();
			si.text = elem;
			si.toXml(writer);
		});
		writer.WriteXmlNodeEnd("sst");
	};
	function CT_PersonList() {
		this.personList = [];
	}
	CT_PersonList.prototype.fromXml = function(reader) {
		if ( !reader.ReadNextNode() )
			return;

		var sName = reader.GetNameNoNS();
		if ("personList" === sName) {
			if (reader.IsEmptyNode()) {
				return;
			}
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("person" === name) {
					var val;
					var person = {providerId: "", userId: "", displayName: ""};
					while (reader.MoveToNextAttribute()) {
						if ("displayName" === reader.GetName()) {
							val = reader.GetValue();
							person.displayName = val;
						} else if ("userId" === reader.GetName()) {
							val = reader.GetValue();
							person.userId = val;
						} else if ("providerId" === reader.GetName()) {
							val = reader.GetValue();
							person.providerId = val;
						} else if ("id" === reader.GetName()) {
							val = reader.GetValue();
							person.id = val;
						}
					}

					this.personList.push(person);

					/*if (reader.IsEmptyNode()) {
						continue;
					}
					var depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						var name2 = reader.GetNameNoNS();
						if ("extLst" === name2) {

						}
					}*/
				}
			}
		}
	};
	CT_PersonList.prototype.toXml = function(writer) {
		writer.WriteXmlString("<personList ");
		writer.WriteXmlString(" xmlns=\"http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments\"");
		writer.WriteXmlString(" xmlns:x=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"");
		writer.WriteXmlString(">");

		for (var i = 0; i < this.personList.length; ++i) {
			if (this.personList[i]) {
				writer.WriteXmlString("<person");
				writer.WriteXmlNullableAttributeStringEncode("displayName", this.personList[i].displayName);
				writer.WriteXmlNullableAttributeString("id", this.personList[i].id);
				writer.WriteXmlNullableAttributeString("userId", this.personList[i].userId);
				writer.WriteXmlNullableAttributeStringEncode("providerId", this.personList[i].providerId);
				writer.WriteXmlString("/>");
			}
		}

		writer.WriteXmlString("</personList>");
	};
	function CT_Si() {
		this.text = null;
		this.multiText = null;
	}
	CT_Si.prototype.clean = function() {
		this.text = null;
		this.multiText = null;
	};
	CT_Si.prototype.fromXml = function(reader) {
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			if ("t" === reader.GetName()) {
				this.text = reader.GetTextDecodeXml();
			} else if ("r" === reader.GetName()) {
				this.text = reader.GetTextDecodeXml();
			}
		}
	};
	CT_Si.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("si");
		writer.WriteXmlAttributesEnd();
		if (null !== this.text) {
			writer.WriteXmlValueString("t", this.text);
		} else if (null !== this.multiText) {
			//todo
			//writer.WriteXmlValueString("r", this.multiText);
		}
		writer.WriteXmlNodeEnd("si");
	};

	function CT_PivotCaches() {
		this.pivotCaches = [];
	}
	CT_PivotCaches.prototype.fromXml = function(reader) {
		var depth = reader.GetDepth();
		while( reader.ReadNextSiblingNode(depth) ) {
			if ( "pivotCache" === reader.GetNameNoNS() ) {
				var pivotCache = new CT_PivotCache();
				pivotCache.fromXml(reader);
				this.pivotCaches.push(pivotCache);
			}
		}
	};
	function CT_DrawingWSRef() {
		this.id = null;
	}
	CT_DrawingWSRef.prototype.fromXml = function(reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};
	CT_DrawingWSRef.prototype.toXml = function(writer, name) {
		writer.WriteXmlNodeStart(name);
		writer.WriteXmlNullableAttributeString("r:id", this.id);
		writer.WriteXmlAttributesEnd(true);
	};
	CT_DrawingWSRef.prototype.readAttr = function(reader) {
		while (reader.MoveToNextAttribute()) {
			if ("id" === reader.GetNameNoNS()) {
				this.id = reader.GetValueDecodeXml();
			}
		}
	};

	function CT_SheetData(ws) {
		this.ws = ws;
		this._openRow = new AscCommonExcel.Row(ws);
	}

	CT_SheetData.prototype.fromXml = function(reader) {
		var depth = reader.GetDepth();
		var row = reader.GetContext().row;
		while (reader.ReadNextSiblingNode(depth)) {
			if ("row" === reader.GetName()) {
				row.clear();
				row.fromXml(reader);
				row.saveContent();
			}
		}
	};
	CT_SheetData.prototype.fromXml2 = function(reader) {

		var depth = reader.GetDepth();
		var tmp = reader.GetContext().InitOpenManager.tmp;
		if (tmp) {
			while (reader.ReadNextSiblingNode(depth)) {
				if ("row" === reader.GetName()) {
					tmp.row.clear();
					tmp.row.fromXml2(reader);
				} /*else if (xlsb) {

			}*/
			}
		}

		/*var res = c_oSerConstants.ReadOk;
		var oThis = this;
		if ( c_oSerWorksheetsTypes.XlsbPos === type )
		{
			var oldPos = this.stream.GetCurPos();
			this.stream.Seek2(this.stream.GetULongLE());

			tmp.ws.fromXLSB(this.stream, this.stream.XlsbReadRecordType(), tmp, this.aCellXfs, this.aSharedStrings,
				function(tmp) {
					oThis.initCellAfterRead(tmp);
				});

			this.stream.Seek2(oldPos);
			res = c_oSerConstants.ReadUnknown;
		}
		else if ( c_oSerWorksheetsTypes.Row === type )
		{
			tmp.pos =  null;
			tmp.len = null;
			tmp.row.clear();
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadRow(t,l, tmp);
			});
			if(null === tmp.row.index) {
				tmp.row.index = tmp.prevRow + 1;
			}
			tmp.row.saveContent();
			tmp.ws.cellsByColRowsCount = Math.max(tmp.ws.cellsByColRowsCount, tmp.row.index + 1);
			tmp.ws.nRowsCount = Math.max(tmp.ws.nRowsCount, tmp.ws.cellsByColRowsCount);
			tmp.prevRow = tmp.row.index;
			tmp.prevCol = -1;
			//читаем ячейки
			if (null !== tmp.pos && null !== tmp.len) {
				var nOldPos = this.stream.GetCurPos();
				this.stream.Seek2(tmp.pos);
				res = this.bcr.Read1(tmp.len, function(t,l){
					return oThis.ReadCells(t,l, tmp);
				});
				this.stream.Seek2(nOldPos);
			}
		}
		else
			res = c_oSerConstants.ReadUnknown;
		return res;*/

		
	};

	AscCommonExcel.Hyperlink.prototype.fromXml = function (reader, ws) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader, ws);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	AscCommonExcel.Hyperlink.prototype.readAttr = function (reader, ws) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"display"),	m_oDisplay)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"r:id"),		m_oRid )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"relationships:id"), m_oRid )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"location"),	m_oLocation )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"ref"),		m_oRef )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"tooltip"),	m_oTooltip )*/

//serialize
		/**/


		var val;
		while (reader.MoveToNextAttribute()) {
			/*if ("display" === reader.GetName()) {
				val = reader.GetValue();
				this.display = val;
			} else*/ if ("r:id" === reader.GetName()) {
				//TODO пока обрабатываю здесь, возможно стоит это сдлелать после чтения всей книги
				val = reader.GetValue();
				var rIdDoc = reader.rels.getRelationshipById(val);
				if (rIdDoc) {
					this.Hyperlink = rIdDoc.targetFullName;
				}
			/*} else if ("relationships:id" === reader.GetName()) {
				val = reader.GetValue();
				this.relationships:id = val;
			*/} else if ("location" === reader.GetName()) {
				val = reader.GetValue();
				this.setLocation(val);
				//this.setLocation(this.stream.GetString2LE(length));
			} else if ("ref" === reader.GetName()) {
				val = reader.GetValue();
				this.Ref = ws.getRange2(val);
			} else if ("tooltip" === reader.GetName()) {
				val = reader.GetValue();
				this.Tooltip = val;
			} /*else if ("hyperlink" === reader.GetName()) {

			}*/
		}
	};

	function CT_Sheets(wb) {
		this.wb = wb;
		this.sheets = [];
	}
	CT_Sheets.prototype.fromXml = function(reader) {
		var depth = reader.GetDepth();
		while( reader.ReadNextSiblingNode(depth) ) {
			if ( "sheet" === reader.GetNameNoNS() ) {
				var sheet = new CT_Sheet();
				sheet.fromXml(reader);
				this.sheets.push(sheet);
			}
		}
	};
	CT_Sheets.prototype.toXml = function(writer) {
		var t = this;
		var context = writer.context;
		var index = 1;
		this.wb.forEach(function(ws) {
			var sheetXml = new CT_Sheet();
			var wsPart = context.part.addPart(AscCommon.openXml.Types.worksheet);
			wsPart.part.setDataXml(ws, writer);
			sheetXml.id = wsPart.rId;
			sheetXml.sheetId = index++;
			sheetXml.name = ws.getName();
			t.sheets.push(sheetXml);
			context.sheetIds[ws.getId()] = sheetXml.sheetId;
		}, context.isCopyPaste);
		writer.WriteXmlNodeStart("sheets");
		writer.WriteXmlAttributesEnd();
		this.sheets.forEach(function(sheetXml) {
			sheetXml.toXml(writer);
		}, context.isCopyPaste);
		writer.WriteXmlNodeEnd("sheets");
	};
	function CT_Sheet() {
		//Attributes
		this.name = null;
		this.sheetId = null;
		this.id = null;
	}
	CT_Sheet.prototype.fromXml = function(reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};
	CT_Sheet.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("sheet");
		writer.WriteXmlNullableAttributeString("name", this.name);
		writer.WriteXmlNullableAttributeNumber("sheetId", this.sheetId);
		writer.WriteXmlNullableAttributeString("r:id", this.id);
		writer.WriteXmlAttributesEnd(true);
	};
	CT_Sheet.prototype.readAttributes = function(attr, uq) {
		if (attr()) {
			this.parseAttributes(attr());
		}
	};
	CT_Sheet.prototype.readAttr = function(reader) {
		while (reader.MoveToNextAttribute()) {
			var name = reader.GetNameNoNS();
			if ("name" === name) {
				this.name = reader.GetValueDecodeXml();
			} else if ("sheetId" === name) {
				this.sheetId = reader.GetValueInt();
			} else if ("id" === name) {
				this.id = reader.GetValueDecodeXml();
			}
		}
	};
	CT_Sheet.prototype.parseAttributes = function(vals, uq) {
		var val;
		val = vals["r:id"];
		if (undefined !== val) {
			this.id = AscCommon.unleakString(uq(val));
		}
	};
	function CT_Value() {
		//Attributes
		this.space = null;
		this.val = null;
	}
	CT_Value.prototype.fromXml = function(reader) {
		this.readAttr(reader);
		this.val = reader.GetText();
	};
	CT_Value.prototype.readAttributes = function(attr, uq) {
		if (attr()) {
			this.parseAttributes(attr());
		}
	};
	CT_Value.prototype.readAttr = function(reader) {
		//todo space
	};
	CT_Value.prototype.parseAttributes = function(vals, uq) {
		var val;
		val = vals["r:id"];
		if (undefined !== val) {
			this.id = AscCommon.unleakString(uq(val));
		}
	};
	function CT_PivotCache() {
		//Attributes
		this.cacheId = null;
		this.id = null;
	}
	CT_PivotCache.prototype.fromXml = function(reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};
	CT_PivotCache.prototype.readAttributes = function(attr, uq) {
		if (attr()) {
			var vals = attr();
			this.parseAttributes(attr(), uq);
		}
	};
	CT_PivotCache.prototype.readAttr = function(reader) {
		while (reader.MoveToNextAttribute()) {
			var name = reader.GetNameNoNS();
			if ("id" === name) {
				this.id = reader.GetValueDecodeXml();
			} else if ("cacheId" === name) {
				this.cacheId = parseInt(reader.GetValue());
			}
		}
	};
	CT_PivotCache.prototype.parseAttributes = function(vals, uq) {
		var val;
		val = vals["cacheId"];
		if (undefined !== val) {
			this.cacheId = val - 0;
		}
		val = vals["r:id"];
		if (undefined !== val) {
			this.id = AscCommon.unleakString(uq(val));
		}
	};
	

	//Tables & AutoFilter
	/*function CT_TableParts(ws) {
		this.ws = ws;
		this.tableParts = [];
	}
	CT_TableParts.prototype.fromXml = function(reader) {
		var depth = reader.GetDepth();
		while( reader.ReadNextSiblingNode(depth) ) {
			if ( "tablePart" === reader.GetNameNoNS() ) {
				var tablePart = new CT_TablePart();
				tablePart.fromXml(reader);
				this.tableParts.push(tablePart);
			}
		}
	};
	function CT_TablePart() {
		//Attributes
		this.name = null;
		this.sheetId = null;
		this.id = null;
	}
	CT_TablePart.prototype.fromXml = function(reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};
	CT_TablePart.prototype.readAttributes = function(attr, uq) {
		if (attr()) {
			this.parseAttributes(attr());
		}
	};
	CT_TablePart.prototype.readAttr = function(reader) {
		while (reader.MoveToNextAttribute()) {
			var name = reader.GetNameNoNS();
			if ("id" === name) {
				this.id = reader.GetValueDecodeXml();
			}
		}
	};*/


	AscCommonExcel.TablePart.prototype.fromXml = function(reader) {
		if (!reader.ReadNextNode()) {
			return;
		}

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("autoFilter" === name) {
				var autoFilter = new AscCommonExcel.AutoFilter();
				autoFilter.fromXml(reader);
				this.AutoFilter = autoFilter;
			} else if ("sortState" === name) {
				var sortState = new AscCommonExcel.SortState();
				sortState.fromXml(reader);
				this.SortState = sortState;
			} else if ("tableColumns" === name) {
				var _depth = reader.GetDepth();
				while (reader.ReadNextSiblingNode(_depth)) {
					var _name = reader.GetNameNoNS();
					if ("tableColumn" === _name) {
						var tableColumn = new AscCommonExcel.TableColumn();
						tableColumn.fromXml(reader);
						if (!this.TableColumns) {
							this.TableColumns = [];
						}
						this.TableColumns.push(tableColumn);
					}
				}
			} else if ("tableStyleInfo" === name) {
				var tableStyleInfo = new AscCommonExcel.TableStyleInfo();
				tableStyleInfo.fromXml(reader);
				this.TableStyleInfo = tableStyleInfo;
			}  else if ("extLst" === name) {

			}
		}

		/*ReadAttributes( oReader );

		if ( oReader.IsEmptyNode() )
			return;

		int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if ( (L"autoFilter") == sName )
			m_oAutoFilter = oReader;
		else if ( (L"sortState") == sName )
			m_oSortState = oReader;
		else if ( (L"tableColumns") == sName )
			m_oTableColumns = oReader;
		else if ( (L"tableStyleInfo") == sName )
			m_oTableStyleInfo = oReader;
		else if ((L"extLst") == sName)
			m_oExtLst = oReader;
		}*/

	};
	AscCommonExcel.TablePart.prototype.readAttr = function(reader) {
		var val;

		/*( oReader, L"name",					m_oName )
		( oReader, L"headerRowCount",		m_oHeaderRowCount )
		( oReader, L"totalsRowCount",		m_oTotalsRowCount )
		( oReader, L"displayName",			m_oDisplayName )
		( oReader, L"tableBorderDxfId",		m_oTableBorderDxfId )
		( oReader, L"comment",				m_oComment )
		( oReader, L"connectionId",			m_oConnectionId )
		( oReader, L"dataDxfId",			m_oDataDxfId )
		( oReader, L"dataCellStyle",		m_oDataCellStyle )
		( oReader, L"headerRowBorderDxfId",	m_oHeaderRowBorderDxfId )
		( oReader, L"headerRowCellStyle",	m_oHeaderRowCellStyle )
		( oReader, L"headerRowDxfId",		m_oHeaderRowDxfId )
		( oReader, L"insertRow",			m_oInsertRow )
		( oReader, L"insertRowShift",		m_oInsertRowShift )
		( oReader, L"published",			m_oPublished )
		( oReader, L"id",					m_oId )
		( oReader, L"tableType",			m_oTableType )
		( oReader, L"totalsRowBorderDxfId",	m_oTotalsRowBorderDxfId )
		( oReader, L"totalsRowCellStyle",	m_oTotalsRowCellStyle )
		( oReader, L"totalsRowDxfId",		m_oTotalsRowDxfId )
		( oReader, L"totalsRowShown",		m_oTotalsRowShown )*/

		/*AutoFilter: null
		DisplayName: null
		HeaderRowCount: null
		QueryTable: null
		Ref: null
		SortState: null
		TableColumns: null
		TableStyleInfo: null
		TotalsRowCount: null
		altText: null
		altTextSummary: null
		handlers: null
		result: null
		tableType: null*/

		
		while (reader.MoveToNextAttribute()) {
			if ("ref" === reader.GetName()) {
				val = reader.GetValue();
				this.Ref = AscCommonExcel.g_oRangeCache.getAscRange(val);
			} else if ("displayName" === reader.GetName()) {
				val = reader.GetValue();
				this.DisplayName = val;
			} else if ("headerRowCount" === reader.GetName()) {
				val = reader.GetValue();
				this.HeaderRowCount = val;
			} else if ("totalsRowCount" === reader.GetName()) {
				val = reader.GetValue();
				this.TotalsRowCount = val;
			}
		}
	};
	AscCommonExcel.TablePart.prototype.toXml = function(writer) {

		/*writer.WriteString(L"<table \
xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" \
xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" \
mc:Ignorable=\"xr xr3\" \
xmlns:xr=\"http://schemas.microsoft.com/office/spreadsheetml/2014/revision\" \
xmlns:xr3=\"http://schemas.microsoft.com/office/spreadsheetml/2016/revision3\"");

		WritingStringNullableAttrInt(L"id", m_oId, m_oId->GetValue());
		WritingStringNullableAttrEncodeXmlString(L"name", m_oName, *m_oName);
		WritingStringNullableAttrEncodeXmlString(L"displayName", m_oDisplayName, *m_oDisplayName);
		WritingStringNullableAttrString(L"ref", m_oRef, m_oRef->ToString());
		WritingStringNullableAttrInt(L"connectionId", m_oConnectionId, m_oConnectionId->GetValue());
		WritingStringNullableAttrString(L"tableType", m_oTableType, m_oTableType->ToString());
		WritingStringNullableAttrString(L"comment", m_oComment, *m_oComment);
		WritingStringNullableAttrInt(L"tableBorderDxfId", m_oTableBorderDxfId, m_oTableBorderDxfId->GetValue());
		WritingStringNullableAttrString(L"dataCellStyle", m_oDataCellStyle, *m_oDataCellStyle);
		WritingStringNullableAttrInt(L"dataDxfId", m_oDataDxfId, m_oDataDxfId->GetValue());
		WritingStringNullableAttrString(L"headerRowCellStyle", m_oHeaderRowCellStyle, *m_oHeaderRowCellStyle);
		WritingStringNullableAttrInt(L"headerRowBorderDxfId", m_oHeaderRowBorderDxfId, m_oHeaderRowBorderDxfId->GetValue());
		WritingStringNullableAttrInt(L"headerRowDxfId", m_oHeaderRowDxfId, m_oHeaderRowDxfId->GetValue());
		WritingStringNullableAttrString(L"totalsRowCellStyle", m_oTotalsRowCellStyle, *m_oTotalsRowCellStyle);
		WritingStringNullableAttrInt(L"totalsRowDxfId", m_oTotalsRowDxfId, m_oTotalsRowDxfId->GetValue());
		WritingStringNullableAttrInt(L"totalsRowBorderDxfId", m_oTotalsRowBorderDxfId, m_oTotalsRowBorderDxfId->GetValue());

		//if (m_oHeaderRowCount.IsInit() && 0 == m_oHeaderRowCount->GetValue())
		//	WritingStringAttrString(L"headerRowCount", L"1");
		//if (m_oTotalsRowCount.IsInit() && m_oTotalsRowCount->GetValue() > 0)
		//          WritingStringAttrString(L"totalsRowCount", L"1");
		//      else
		//	WritingStringAttrString(L"totalsRowShown", L"0");//m_oTotalsRowShownz
		WritingStringNullableAttrInt(L"headerRowCount", m_oHeaderRowCount, m_oHeaderRowCount->GetValue());
		WritingStringNullableAttrInt(L"totalsRowCount", m_oTotalsRowCount, m_oTotalsRowCount->GetValue());
		WritingStringNullableAttrBool2(L"totalsRowShown", m_oTotalsRowShown);

		WritingStringNullableAttrBool2(L"insertRow", m_oInsertRow);
		WritingStringNullableAttrBool2(L"insertRowShift", m_oInsertRowShift);
		WritingStringNullableAttrBool2(L"published", m_oPublished);

		writer.WriteString(L">");

		if(m_oAutoFilter.IsInit())
			m_oAutoFilter->toXML(writer);
		if(m_oSortState.IsInit())
			m_oSortState->toXML(writer);
		if(m_oTableColumns.IsInit())
			m_oTableColumns->toXML(writer);
		if(m_oTableStyleInfo.IsInit())
			m_oTableStyleInfo->toXML(writer);
		if(m_oExtLst.IsInit())
		{
			writer.WriteString(m_oExtLst->toXMLWithNS(L""));
		}
		writer.WriteString(L"</table>");*/





		writer.WriteXmlString('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n');
		writer.WriteXmlNodeStart("table");
		writer.WriteXmlString(' xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" mc:Ignorable="xr xr3"');
		var tableIds = writer.context.InitSaveManager.getTableIds();
		writer.WriteXmlNullableAttributeNumber("id", undefined != tableIds[this.DisplayName] ? tableIds[this.DisplayName].id : null);
		writer.WriteXmlNullableAttributeStringEncode("name", this.Name ? this.Name : null);
		writer.WriteXmlNullableAttributeStringEncode("displayName", this.DisplayName);
		writer.WriteXmlNullableAttributeString("ref", this.Ref.getName());
		writer.WriteXmlNullableAttributeNumber("headerRowCount", this.HeaderRowCount);
		writer.WriteXmlNullableAttributeNumber("totalsRowCount", this.TotalsRowCount);

		writer.WriteXmlAttributesEnd();

		if (this.AutoFilter) {
			this.AutoFilter.toXml(writer);
		}
		if (this.SortState) {
			this.SortState.toXml(writer);
		}
		if(this.TableColumns) {
			writer.WriteXmlNodeStart("tableColumns");
			writer.WriteXmlAttributeNumber("count", this.TableColumns.length);
			writer.WriteXmlAttributesEnd();

			for (var i = 0; i < this.TableColumns.length; ++i) {
				this.TableColumns[i].toXml(writer, i);
			}
			writer.WriteXmlNodeEnd("tableColumns");
		}
		if (this.TableStyleInfo) {
			this.TableStyleInfo.toXml(writer);
		}
		/*if(m_oExtLst.IsInit())
		{
			writer.WriteString(m_oExtLst->toXMLWithNS(L""));
		}*/

		writer.WriteXmlNodeEnd("table");
	};
	AscCommonExcel.TablePart.prototype.setAttr = function(attr, val, oAttr) {
		//была идея делать так для удобства, но память нужно экономить
		/*var oAttr = {"ref": "Ref", "displayName" : "DisplayName", "headerRowCount" : "HeaderRowCount"};
		while (reader.MoveToNextAttribute()) {
			this.setAttr(reader.GetName(), reader.GetValue(), oAttr);
		}*/

		if (oAttr[attr]) {
			this[oAttr[attr]] = val;
		}
	};

	/*void CTable::fromXML(XmlUtils::CXmlLiteReader& oReader)
	{
		ReadAttributes( oReader );

		if ( oReader.IsEmptyNode() )
			return;

		int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if ( (L"autoFilter") == sName )
			m_oAutoFilter = oReader;
		else if ( (L"sortState") == sName )
			m_oSortState = oReader;
		else if ( (L"tableColumns") == sName )
			m_oTableColumns = oReader;
		else if ( (L"tableStyleInfo") == sName )
			m_oTableStyleInfo = oReader;
		else if ((L"extLst") == sName)
			m_oExtLst = oReader;
		}
	}
	void CTable::ReadAttributes(XmlUtils::CXmlLiteReader& oReader)
	{
		WritingElement_ReadAttributes_Start( oReader )
		( oReader, L"ref",					m_oRef )
			( oReader, L"name",					m_oName )
			( oReader, L"headerRowCount",		m_oHeaderRowCount )
			( oReader, L"totalsRowCount",		m_oTotalsRowCount )
			( oReader, L"displayName",			m_oDisplayName )
			( oReader, L"tableBorderDxfId",		m_oTableBorderDxfId )
			( oReader, L"comment",				m_oComment )
			( oReader, L"connectionId",			m_oConnectionId )
			( oReader, L"dataDxfId",			m_oDataDxfId )
			( oReader, L"dataCellStyle",		m_oDataCellStyle )
			( oReader, L"headerRowBorderDxfId",	m_oHeaderRowBorderDxfId )
			( oReader, L"headerRowCellStyle",	m_oHeaderRowCellStyle )
			( oReader, L"headerRowDxfId",		m_oHeaderRowDxfId )
			( oReader, L"insertRow",			m_oInsertRow )
			( oReader, L"insertRowShift",		m_oInsertRowShift )
			( oReader, L"published",			m_oPublished )
			( oReader, L"id",					m_oId )
			( oReader, L"tableType",			m_oTableType )
			( oReader, L"totalsRowBorderDxfId",	m_oTotalsRowBorderDxfId )
			( oReader, L"totalsRowCellStyle",	m_oTotalsRowCellStyle )
			( oReader, L"totalsRowDxfId",		m_oTotalsRowDxfId )
			( oReader, L"totalsRowShown",		m_oTotalsRowShown )
		WritingElement_ReadAttributes_End( oReader )
	}*/
	AscCommonExcel.AutoFilter.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			if ("filterColumn" === reader.GetName()) {
				var filterColumn = new AscCommonExcel.FilterColumn();
				filterColumn.fromXml(reader);
				if (!this.FilterColumns) {
					this.FilterColumns = [];
				}
				this.FilterColumns.push(filterColumn);
			} else if ("sortState" === reader.GetName()) {
				var sortState = new AscCommonExcel.SortState();
				sortState.fromXml(reader);
				this.SortState = sortState;
			}
		}
	};
	AscCommonExcel.AutoFilter.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("ref" === reader.GetName()) {
				val = reader.GetValue();
				this.Ref = AscCommonExcel.g_oRangeCache.getAscRange(val);
			}
		}
	};
	AscCommonExcel.AutoFilter.prototype.toXml = function(writer) {
		writer.WriteXmlNodeStart("autoFilter");
		if (null !== this.Ref) {
			writer.WriteXmlAttributeStringEncode("ref", this.Ref.getName());
		}
		writer.WriteXmlAttributesEnd();
		if (this.FilterColumns) {
			for (var i = 0; i < this.FilterColumns.length; ++i) {
				var elem = this.FilterColumns[i];
				elem.toXml(writer);
			}
		}
		if (this.SortState) {
			this.SortState.toXml(writer);
		}

		writer.WriteXmlNodeEnd("autoFilter");
	};

	AscCommonExcel.TableStyleInfo.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (!reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}

	};
	AscCommonExcel.TableStyleInfo.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.Name = val;
			} else if ("showColumnStripes" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowColumnStripes = val;
			} else if ("showFirstColumn" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowFirstColumn = val;
			} else if ("showLastColumn" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowLastColumn = val;
			} else if ("showRowStripes" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowRowStripes = val;
			}
		}
	};

	AscCommonExcel.TableStyleInfo.prototype.toXml = function (writer) {

		/*int nShowColumnStripes = 0;
		int nShowFirstColumn = 0;
		int nShowLastColumn = 0;
		int nShowRowStripes = 0;
		if(m_oShowColumnStripes.IsInit() && true == m_oShowColumnStripes->ToBool())
		nShowColumnStripes = 1;
		if(m_oShowFirstColumn.IsInit() && true == m_oShowFirstColumn->ToBool())
		nShowFirstColumn = 1;
		if(m_oShowLastColumn.IsInit() && true == m_oShowLastColumn->ToBool())
		nShowLastColumn = 1;
		if(m_oShowRowStripes.IsInit() && true == m_oShowRowStripes->ToBool())
		nShowRowStripes = 1;

		writer.WriteString(L"<tableStyleInfo");
		WritingStringNullableAttrEncodeXmlString(L"name", m_oName, m_oName.get());
		WritingStringAttrInt(L"showFirstColumn", nShowFirstColumn);
		WritingStringAttrInt(L"showLastColumn", nShowLastColumn);
		WritingStringAttrInt(L"showRowStripes", nShowRowStripes);
		WritingStringAttrInt(L"showColumnStripes", nShowColumnStripes);
		writer.WriteString(L"/>");*/

		var nShowColumnStripes = this.ShowColumnStripes === true ? 1 : 0;
		var nShowFirstColumn = this.ShowFirstColumn === true ? 1 : 0;
		var nShowLastColumn = this.ShowLastColumn === true ? 1 : 0;
		var nShowRowStripes = this.ShowRowStripes === true ? 1 : 0;

		writer.WriteXmlNodeStart("tableStyleInfo");

		writer.WriteXmlNullableAttributeStringEncode("name", this.Name);
		writer.WriteXmlAttributeNumber("showFirstColumn", nShowFirstColumn);
		writer.WriteXmlAttributeNumber("showLastColumn", nShowLastColumn);
		writer.WriteXmlAttributeNumber("showRowStripes", nShowRowStripes);
		writer.WriteXmlAttributeNumber("showColumnStripes", nShowColumnStripes);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("tableStyleInfo");
	};

	AscCommonExcel.TableColumn.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("totalsRowFormula" === name) {
				/*var formula = this.stream.GetString2LE(length);
				this.oReadResult.tableCustomFunc.push({formula: formula, column: oTableColumn, ws: this.ws});*/
			} else if ("calculatedColumnFormula" === name) {
				/*var DxfId = this.stream.GetULongLE();
				oTableColumn.dxf = this.Dxfs[DxfId];*/
			}
		}

		/*int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if ( (L"totalsRowFormula") == sName )
			m_oTotalsRowFormula = oReader.GetText3();
		else if ( (L"calculatedColumnFormula") == sName )
			m_oCalculatedColumnFormula = oReader.GetText3();
		}*/
	};
	AscCommonExcel.TableColumn.prototype.readAttr = function(reader) {

		/*WritingElement_ReadAttributes_Read_if     ( oReader, L"dataCellStyle",		m_oDataCellStyle )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"dataDxfId",			m_oDataDxfId )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"headerRowCellStyle",	m_oHeaderRowCellStyle )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"headerRowDxfId",		m_oHeaderRowDxfId )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"id",					m_oId )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"name",				m_oName )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"queryTableFieldId",	m_oQueryTableFieldId )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"totalsRowCellStyle",	m_oTotalsRowCellStyle )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"totalsRowDxfId",		m_oTotalsRowDxfId )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"totalsRowLabel",		m_oTotalsRowLabel )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"totalsRowFunction",	m_oTotalsRowFunction )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"uniqueName",			m_oUniqueName )
		WritingElement_ReadAttributes_Read_if     ( oReader, L"uid",				m_oUid )*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.Name = val;
			} else if ("totalsRowLabel" === reader.GetName()) {
				val = reader.GetValue();
				this.TotalsRowLabel = val;
			} else if ("totalsRowFunction" === reader.GetName()) {
				val = reader.GetValue();
				this.TotalsRowFunction = val;
			} else if ("dataDxfId" === reader.GetName()) {
				val = reader.GetValue();
				this.dxf = val;
				/*var DxfId = this.stream.GetULongLE();
				oTableColumn.dxf = this.Dxfs[DxfId];*/
			} else if ("showRowStripes" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowRowStripes = val;
			} else if ("queryTableFieldId" === reader.GetName()) {
				val = reader.GetValueBool();
				this.queryTableFieldId = val;
				//oTableColumn.queryTableFieldId = this.stream.GetULongLE();
			} else if ("uniqueName" === reader.GetName()) {
				val = reader.GetValue();
				this.uniqueName = val;
			}
		}
	};


	AscCommonExcel.TableColumn.prototype.toXml = function (writer, index) {

		/*std::wstring sRoot;
	writer.WriteString(L"<tableColumn");
	WritingStringNullableAttrInt(L"id", m_oId, m_oId->GetValue());
	WritingStringNullableAttrEncodeXmlString(L"name", m_oName, *m_oName);
	WritingStringNullableAttrEncodeXmlString(L"uniqueName", m_oUniqueName, *m_oUniqueName);
	WritingStringNullableAttrEncodeXmlString(L"totalsRowLabel", m_oTotalsRowLabel, m_oTotalsRowLabel.get());
	//есть такой баг: при сохранениии "sum" и названия таблицы "Table1" (русский excel), выдается ошибка в формулах
	WritingStringNullableAttrString(L"totalsRowFunction", m_oTotalsRowFunction, m_oTotalsRowFunction->ToString());
	WritingStringNullableAttrInt(L"queryTableFieldId", m_oQueryTableFieldId, m_oQueryTableFieldId->GetValue());
	WritingStringNullableAttrString(L"dataCellStyle", m_oDataCellStyle, *m_oDataCellStyle);
	WritingStringNullableAttrInt(L"dataDxfId", m_oDataDxfId, m_oDataDxfId->GetValue());
	WritingStringNullableAttrString(L"headerRowCellStyle", m_oHeaderRowCellStyle, *m_oHeaderRowCellStyle);
	WritingStringNullableAttrInt(L"headerRowDxfId", m_oHeaderRowDxfId, m_oHeaderRowDxfId->GetValue());
	WritingStringNullableAttrString(L"totalsRowCellStyle", m_oTotalsRowCellStyle, *m_oTotalsRowCellStyle);
	WritingStringNullableAttrInt(L"totalsRowDxfId", m_oTotalsRowDxfId, m_oTotalsRowDxfId->GetValue());
	if(m_oTotalsRowFormula.IsInit() || m_oCalculatedColumnFormula.IsInit())
	{
		writer.WriteString(L">");

		if(m_oCalculatedColumnFormula.IsInit())
		{
			WritingStringValEncodeXmlString(L"calculatedColumnFormula", m_oCalculatedColumnFormula.get());
		}
		if(m_oTotalsRowFormula.IsInit())
		{
			WritingStringValEncodeXmlString(L"totalsRowFormula", m_oTotalsRowFormula.get());
		}

		writer.WriteString(L"</tableColumn>");
	}
	else
	{
		writer.WriteString(L"/>");
	}*/


		writer.WriteXmlNodeStart("tableColumn");

		writer.WriteXmlNullableAttributeNumber("id", this.Id ? this.Id : index + 1);
		writer.WriteXmlNullableAttributeStringEncode("name", this.Name);
		writer.WriteXmlNullableAttributeStringEncode("uniqueName", this.UniqueName ? this.UniqueName : null);
		writer.WriteXmlNullableAttributeStringEncode("totalsRowLabel", this.TotalsRowLabel);
		//есть такой баг: при сохранениии "sum" и названия таблицы "Table1" (русский excel), выдается ошибка в формулах
		writer.WriteXmlNullableAttributeString("totalsRowFunction", this.TotalsRowFunction);
		writer.WriteXmlNullableAttributeNumber("queryTableFieldId", this.QueryTableFieldId ? this.QueryTableFieldId :  null);
		writer.WriteXmlNullableAttributeString("dataCellStyle", this.DataCellStyle ? this.DataCellStyle : null);
		writer.WriteXmlNullableAttributeNumber("dataDxfId", this.DataDxfId ? this.DataDxfId : null);
		writer.WriteXmlNullableAttributeString("headerRowCellStyle", this.HeaderRowCellStyle ? this.HeaderRowCellStyle : null);
		writer.WriteXmlNullableAttributeNumber("headerRowDxfId", this.HeaderRowDxfId ? this.HeaderRowDxfId : null);
		writer.WriteXmlNullableAttributeString("totalsRowCellStyle", this.TotalsRowCellStyle ? this.TotalsRowCellStyle : null);
		writer.WriteXmlNullableAttributeNumber("totalsRowDxfId", this.TotalsRowDxfId ? this.TotalsRowDxfId : null);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("tableColumn");
	};

	AscCommonExcel.SortState.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("sortCondition" === name) {
				var sortCondition = new AscCommonExcel.SortCondition();
				sortCondition.fromXml(reader);
				if (!this.SortConditions) {
					this.SortConditions = [];
				}
				this.SortConditions.push(sortCondition);
			}
		}
	};

	AscCommonExcel.SortState.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("ref" === reader.GetName()) {
				val = reader.GetValue();
				this.Ref = AscCommonExcel.g_oRangeCache.getAscRange(val);
			} else if ("caseSensitive" === reader.GetName()) {
				val = reader.GetValueBool();
				this.CaseSensitive = val;
			} else if ("columnSort" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ColumnSort = val;
			} else if ("sortMethod" === reader.GetName()) {
				val = reader.GetValue();
				this.SortMethod = val;
			}
		}
	};

	AscCommonExcel.SortState.prototype.toXml = function (writer) {

		/*if(m_oRef.IsInit() && !m_arrItems.empty())
		{
			writer.WriteString(L"<sortState");
			WritingStringAttrEncodeXmlString(L"ref", m_oRef->ToString());
			WritingStringNullableAttrBool(L"caseSensitive", m_oCaseSensitive);
			WritingStringNullableAttrBool(L"columnSort", m_oColumnSort);
			WritingStringNullableAttrString(L"sortMethod", m_oSortMethod, m_oSortMethod->ToString());
			writer.WriteString(L">");

			for ( size_t i = 0; i < m_arrItems.size(); ++i)
			{
				if (  m_arrItems[i] )
				{
					m_arrItems[i]->toXML(writer);
				}
			}

			writer.WriteString(L"</sortState>");*/

		writer.WriteXmlNodeStart("sortState");
		writer.WriteXmlString(' xmlns:xlrd2="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2"');

		if (null !== this.Ref) {
			writer.WriteXmlAttributeStringEncode("ref", this.Ref.getName());
		}
		if (null !== this.CaseSensitive) {
			writer.WriteXmlAttributeBool("caseSensitive", this.CaseSensitive);
		}
		if (null !== this.ColumnSort) {
			writer.WriteXmlAttributeBool("columnSort", this.ColumnSort);
		}
		if (null !== this.SortMethod) {
			writer.WriteXmlAttributeString("sortMethod", this.SortMethod);
		}
		writer.WriteXmlAttributesEnd();

		if (this.SortConditions) {
			for (var i = 0; i < this.SortConditions.length; ++i) {
				this.SortConditions[i].toXml(writer);
			}
		}

		writer.WriteXmlNodeEnd("sortState");

	};


	AscCommonExcel.FilterColumn.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("colorFilter" === name) {
				val = new Asc.ColorFilter();
				val.fromXml(reader);
				this.ColorFilter = val;
			} else if ("dynamicFilter" === name) {
				val = new Asc.DynamicFilter();
				val.fromXml(reader);
				this.DynamicFilter = val;
			} else if ("customFilters" === name) {
				val = new Asc.CustomFilters();
				val.fromXml(reader);
				this.CustomFiltersObj = val;
			} else if ("filters" === name) {
				val = new AscCommonExcel.Filters();
				val.fromXml(reader);
				this.Filters = val;
				this.Filters.sortDate();
				/*oFilterColumn.Filters = new AscCommonExcel.Filters();
				res = this.bcr.Read1(length, function(t,l){
					return oThis.ReadFilters(t,l, oFilterColumn.Filters);
				});
				oFilterColumn.Filters.sortDate();*/
			} else if ("top10" === name) {
				val = new AscCommonExcel.Top10();
				val.fromXml(reader);
				this.Filters = val;
			}
		}
	};

	AscCommonExcel.FilterColumn.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("colId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.ColId = val;
			} else if ("hiddenButton" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowButton = !val;
			} else if ("showButton" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowButton = val;
			}
		}
	};

	AscCommonExcel.FilterColumn.prototype.toXml = function(writer) {
		/*writer.StartNodeWithNS(node_ns, node_name);
		writer.StartAttributes();
		WritingStringNullableAttrInt(L"colId", m_oColId, m_oColId->GetValue());
		if(m_oShowButton.IsInit() && false == m_oShowButton->ToBool())
		writer.WriteString(L" showButton=\"0\"");
		WritingStringNullableAttrBool(L"hiddenButton", m_oHiddenButton);
		writer.EndAttributes();
		if(m_oColorFilter.IsInit())
			m_oColorFilter->toXMLWithNS(writer, child_ns, L"colorFilter", child_ns);
		if(m_oDynamicFilter.IsInit())
			m_oDynamicFilter->toXMLWithNS(writer, child_ns, L"dynamicFilter", child_ns);
		if(m_oCustomFilters.IsInit())
			m_oCustomFilters->toXMLWithNS(writer, child_ns, L"customFilters", child_ns);
		if(m_oFilters.IsInit())
			m_oFilters->toXMLWithNS(writer, child_ns, L"filters", child_ns);
		if(m_oTop10.IsInit())
			m_oTop10->toXMLWithNS(writer, child_ns, L"top10", child_ns);
		writer.EndNodeWithNS(node_ns, node_name);*/

		//TODO дублиуется код в workbookElems

		writer.WriteXmlNodeStart("filterColumn");

		if (null !== this.ColId) {
			writer.WriteXmlAttributeNumber("colId", this.ColId);
		}
		if (true !== this.ShowButton) {
			if (this.ShowButton) {
				writer.WriteXmlAttributeBool("showButton", this.ShowButton);
			} else {
				writer.WriteXmlAttributeBool("hiddenButton", !this.ShowButton);
			}
		}
		writer.WriteXmlAttributesEnd();

		if (null !== this.ColorFilter) {
			this.ColorFilter.toXml(writer);
		}
		if (null !== this.CustomFiltersObj) {
			this.CustomFiltersObj.toXml(writer);
		}
		if (null !== this.DynamicFilter) {
			this.DynamicFilter.toXml(writer);
		}
		if (null !== this.Filters) {
			this.Filters.toXml(writer);
		}
		if (null !== this.Top10) {
			this.Top10.toXml(writer);
		}
		writer.WriteXmlNodeEnd("filterColumn");

	};

	AscCommonExcel.SortCondition.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (!reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	AscCommonExcel.SortCondition.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_SortCondition">
			160 <xsd:attribute name="descending" type="xsd:boolean" use="optional" default="false"/>
			161 <xsd:attribute name="sortBy" type="ST_SortBy" use="optional" default="value"/>
			162 <xsd:attribute name="ref" type="ST_Ref" use="required"/>
			163 <xsd:attribute name="customList" type="s:ST_Xstring" use="optional"/>
			164 <xsd:attribute name="dxfId" type="ST_DxfId" use="optional"/>
			165 <xsd:attribute name="iconSet" type="ST_IconSetType" use="optional" default="3Arrows"/>
			166 <xsd:attribute name="iconId" type="xsd:unsignedInt" use="optional"/>
			167 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("descending"),      m_oDescending )
		WritingElement_ReadAttributes_Read_if     ( oReader, _T("ref"),      m_oRef )
		WritingElement_ReadAttributes_Read_if     ( oReader, _T("sortBy"),      m_oSortBy )
		WritingElement_ReadAttributes_Read_if     ( oReader, _T("dxfId"),      m_oDxfId )*/

		//serialize
		/*var res = c_oSerConstants.ReadOk;
		if ( c_oSer_SortState.ConditionRef == type )
			oSortCondition.Ref = AscCommonExcel.g_oRangeCache.getAscRange(this.stream.GetString2LE(length));
		else if ( c_oSer_SortState.ConditionSortBy == type )
			oSortCondition.ConditionSortBy = this.stream.GetUChar();
		else if ( c_oSer_SortState.ConditionDescending == type )
			oSortCondition.ConditionDescending = this.stream.GetBool();
		else if ( c_oSer_SortState.ConditionDxfId == type )
		{
			var DxfId = this.stream.GetULongLE();
			oSortCondition.dxf = this.Dxfs[DxfId];
		}
		else
			res = c_oSerConstants.ReadUnknown;
		return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("descending" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ConditionDescending = val;
			} else if ("ref" === reader.GetName()) {
				val = AscCommonExcel.g_oRangeCache.getAscRange(reader.GetValue());
				this.Ref = val;
			} else if ("sortBy" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ConditionSortBy = val;
			} else if ("dxfId" === reader.GetName()) {
				val = reader.GetValueBool();
				this.dxf = val;
				/*var DxfId = this.stream.GetULongLE();
				oSortCondition.dxf = this.Dxfs[DxfId];*/
			}
		}
	};

	AscCommonExcel.SortCondition.prototype.toXml = function (writer) {

		/*writer.StartNodeWithNS(node_ns, node_name);
		writer.StartAttributes();
		WritingStringNullableAttrString(L"sortBy", m_oSortBy, m_oSortBy->ToString());
		WritingStringNullableAttrBool(L"descending", m_oDescending);
		WritingStringNullableAttrEncodeXmlString(L"ref", m_oRef, m_oRef->ToString());
		WritingStringNullableAttrInt(L"dxfId", m_oDxfId, m_oDxfId->GetValue());
		writer.EndAttributesAndNode();*/

		writer.WriteXmlNodeStart("sortCondition");

		if (null !== this.ConditionSortBy) {
			writer.WriteXmlAttributeString("sortBy", this.ConditionSortBy);
		}
		if (null !== this.ConditionDescending) {
			writer.WriteXmlAttributeBool("descending", this.ConditionDescending);
		}
		if (null !== this.Ref) {
			writer.WriteXmlAttributeStringEncode("ref", this.Ref.getName());
		}
		if (null !== this.dxf) {
			writer.WriteXmlAttributeNumber("dxfId", this.dxf);
		}
		writer.WriteXmlAttributesEnd();


		writer.WriteXmlNodeEnd("sortCondition");
	};

	Asc.ColorFilter.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (!reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.ColorFilter.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_ColorFilter">
		67 <xsd:attribute name="dxfId" type="ST_DxfId" use="optional"/>
		68 <xsd:attribute name="cellColor" type="xsd:boolean" use="optional" default="true"/>
		69 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Start( oReader )

		WritingElement_ReadAttributes_Read_if     ( oReader, _T("cellColor"),      m_oCellColor )
		WritingElement_ReadAttributes_Read_if     ( oReader, _T("dxfId"),      m_oDxfId )

		WritingElement_ReadAttributes_End( oReader )*/

		//serialize
		/*  var res = c_oSerConstants.ReadOk;
		if ( c_oSer_ColorFilter.CellColor == type )
			oColorFilter.CellColor = this.stream.GetBool();
		else if ( c_oSer_ColorFilter.DxfId == type )
		{
			var DxfId = this.stream.GetULongLE();
			oColorFilter.dxf = this.Dxfs[DxfId];
		}
		else
			res = c_oSerConstants.ReadUnknown;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("cellColor" === reader.GetName()) {
				val = reader.GetValueBool();
				this.CellColor = val;
			} else if ("dxfId" === reader.GetName()) {
				//TODO все dxf проверить
				val = reader.GetValue();
				this.dxf = val;
				/*var DxfId = this.stream.GetULongLE();
				oColorFilter.dxf = this.Dxfs[DxfId];*/
			}
		}
	};

	Asc.ColorFilter.prototype.toXml = function(writer) {
		/*writer.StartNodeWithNS(node_ns, node_name);
		writer.StartAttributes();
		WritingStringAttrInt(L"dxfId", m_oDxfId->GetValue());
		if(m_oCellColor.IsInit() && false == m_oCellColor->ToBool())
		writer.WriteString(L" cellColor=\"0\"");
		writer.EndAttributesAndNode();*/

		writer.WriteXmlNodeStart("colorFilter");
		writer.WriteXmlNullableAttributeNumber("dxfId", this.dxf ? this.dxf : null);
		if (this.CellColor === false) {
			writer.WriteXmlNullableAttributeNumber("cellColor", 0);
		}
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("colorFilter");
	};

	Asc.DynamicFilter.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (!reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.DynamicFilter.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_DynamicFilter">
		85 <xsd:attribute name="type" type="ST_DynamicFilterType" use="required"/>
		86 <xsd:attribute name="valIso" type="xsd:dateTime" use="optional"/>
		87 <xsd:attribute name="maxValIso" type="xsd:dateTime" use="optional"/>
		88 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("type"),      m_oType )
		WritingElement_ReadAttributes_Read_if     ( oReader, _T("val"),      m_oVal )
		WritingElement_ReadAttributes_Read_if     ( oReader, _T("maxVal"),      m_oMaxVal )*/

		//serialize
		/*   if ( c_oSer_DynamicFilter.Type == type )
                oDynamicFilter.Type = this.stream.GetUChar();
            else if ( c_oSer_DynamicFilter.Val == type )
                oDynamicFilter.Val = this.stream.GetDoubleLE();
            else if ( c_oSer_DynamicFilter.MaxVal == type )
                oDynamicFilter.MaxVal = this.stream.GetDoubleLE();*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("type" === reader.GetName()) {
				val = reader.GetValue();
				this.Type = val;
			} else if ("val" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.val = val;
			} else if ("maxVal" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.MaxVal = val;
			}
		}
	};

	Asc.DynamicFilter.prototype.toXml = function(writer) {
		/*writer.StartNodeWithNS(node_ns, node_name);
		writer.StartAttributes();
		WritingStringAttrString(L"type", m_oType->ToString());
		WritingStringNullableAttrDouble(L"val", m_oVal, m_oVal->GetValue());
		WritingStringNullableAttrDouble(L"maxVal", m_oMaxVal, m_oMaxVal->GetValue());
		writer.EndAttributesAndNode();*/

		writer.WriteXmlNodeStart("dynamicFilter");
		writer.WriteXmlAttributeString("type", this.Type);
		writer.WriteXmlNullableAttributeNumber("val", this.val);
		writer.WriteXmlNullableAttributeNumber("maxVal", this.MaxVal);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("dynamicFilter");
	};

	Asc.CustomFilters.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("customFilter" === name) {
				var val = new Asc.CustomFilter();
				val.fromXml(reader);
				if (!this.CustomFilters) {
					this.CustomFilters = [];
				}
				this.CustomFilters.push(val);
			}
		}

		/*ReadAttributes( oReader );

		if ( oReader.IsEmptyNode() )
			return;

		int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if ( _T("customFilter") == sName )
				m_arrItems.push_back( new CCustomFilter(oReader));
		}*/
	};

	Asc.CustomFilters.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_CustomFilters">
		51 <xsd:sequence>
		52 <xsd:element name="customFilter" type="CT_CustomFilter" minOccurs="1" maxOccurs="2"/>
		53 </xsd:sequence>
		54 <xsd:attribute name="and" type="xsd:boolean" use="optional" default="false"/>
		55 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("and"),      m_oAnd )*/

		//serialize
		/*    if ( c_oSer_CustomFilters.And == type )
                oCustomFilters.And = this.stream.GetBool();
            else if ( c_oSer_CustomFilters.CustomFilters == type )
            {
                oCustomFilters.CustomFilters = [];
                res = this.bcr.Read1(length, function(t,l){
                    return oThis.ReadCustomFiltersItems(t,l, oCustomFilters.CustomFilters);
                });
            }*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("And" === reader.GetName()) {
				val = reader.GetValueBool();
				this.And = val;
			}
		}
	};

	Asc.CustomFilters.prototype.toXml = function(writer) {
		/*if(m_arrItems.empty()) return;

		writer.StartNodeWithNS(node_ns, node_name);
		writer.StartAttributes();
		if (m_oAnd.IsInit() && true == m_oAnd->ToBool())
		writer.WriteString(L" and=\"1\"");
		writer.EndAttributes();

		for ( size_t i = 0; i < m_arrItems.size(); ++i)
		{
			if (  m_arrItems[i] )
			{
				m_arrItems[i]->toXMLWithNS(writer, child_ns, L"customFilter", child_ns);
			}
		}

		writer.EndNodeWithNS(node_ns, node_name);*/

		writer.WriteXmlNodeStart("сustomFilters");

		writer.WriteXmlNullableAttributeString("and", this.And ? 1 : null);
		writer.WriteXmlAttributesEnd();

		for ( var i = 0; i < this.CustomFilters.length; ++i)
		{
			this.CustomFilters[i].toXml(writer);
		}

		writer.WriteXmlNodeEnd("сustomFilters");
	};

	Asc.CustomFilter.prototype.fromXml = function (reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};

	Asc.CustomFilter.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_CustomFilters">
		51 <xsd:sequence>
		52 <xsd:element name="customFilter" type="CT_CustomFilter" minOccurs="1" maxOccurs="2"/>
		53 </xsd:sequence>
		54 <xsd:attribute name="and" type="xsd:boolean" use="optional" default="false"/>
		55 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("operator"),      m_oOperator )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("val"),      m_oVal )*/

		//serialize
		/*     var res = c_oSerConstants.ReadOk;
            if ( c_oSer_CustomFilters.Operator == type )
                oCustomFiltersItem.Operator = this.stream.GetUChar();
            else if ( c_oSer_CustomFilters.Val == type )
                oCustomFiltersItem.Val = this.stream.GetString2LE(length);*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("operator" === reader.GetName()) {
				val = reader.GetValue();
				this.Operator = this.convertOperator(val);
			} else if ("val" === reader.GetName()) {
				val = reader.GetValue();
				this.Val = val;
			}
		}
	};

	Asc.CustomFilter.prototype.toXml = function(writer) {
		/*if(m_oOperator.IsInit() && m_oVal.IsInit())
		{
			writer.StartNodeWithNS(node_ns, node_name);
			writer.StartAttributes();
			WritingStringAttrString(L"operator", m_oOperator->ToString());
			WritingStringAttrEncodeXmlString(L"val", m_oVal.get());
			writer.EndAttributesAndNode();
		}*/

		writer.WriteXmlNodeStart("сustomFilter");

		writer.WriteXmlAttributeString("operator", this.convertOperator(this.Operator, true));
		writer.WriteXmlAttributeStringEncode("val", this.Val);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("сustomFilter");
	};

	Asc.CustomFilter.prototype.convertOperator = function(val, revert) {
		/*<xsd:simpleType name="ST_FilterOperator">
					75 <xsd:restriction base="xsd:string">
					76 <xsd:enumeration value="equal"/>
					77 <xsd:enumeration value="lessThan"/>
					78 <xsd:enumeration value="lessThanOrEqual"/>
					79 <xsd:enumeration value="notEqual"/>
					80 <xsd:enumeration value="greaterThanOrEqual"/>
					81 <xsd:enumeration value="greaterThan"/>
					82 </xsd:restriction>
					83 </xsd:simpleType>*/

		/*var c_oAscCustomAutoFilter = {
			equals: 1,
			isGreaterThan: 2,
			isGreaterThanOrEqualTo: 3,
			isLessThan: 4,
			isLessThanOrEqualTo: 5,
			doesNotEqual: 6,
			beginsWith: 7,
			doesNotBeginWith: 8,
			endsWith: 9,
			doesNotEndWith: 10,
			contains: 11,
			doesNotContain: 12
		};*/

		var res;
		if (revert) {
			switch (val) {
				case Asc.c_oAscCustomAutoFilter.equals:
					res = "equal";
					break;
				case Asc.c_oAscCustomAutoFilter.isLessThan:
					res = "lessThan";
					break;
				case Asc.c_oAscCustomAutoFilter.isLessThanOrEqualTo:
					res = "lessThanOrEqual";
					break;
				case Asc.c_oAscCustomAutoFilter.doesNotEqual:
					res = "notEqual";
					break;
				case Asc.c_oAscCustomAutoFilter.isGreaterThanOrEqualTo:
					res = "greaterThanOrEqual";
					break;
				case Asc.c_oAscCustomAutoFilter.isGreaterThan:
					res = "greaterThan";
					break;
			}
		} else {
			switch (val) {
				case "equal":
					res = Asc.c_oAscCustomAutoFilter.equals;
					break;
				case "lessThan":
					res = Asc.c_oAscCustomAutoFilter.isLessThan;
					break;
				case "lessThanOrEqual":
					res = Asc.c_oAscCustomAutoFilter.isLessThanOrEqualTo;
					break;
				case "notEqual":
					res = Asc.c_oAscCustomAutoFilter.doesNotEqual;
					break;
				case "greaterThanOrEqual":
					res = Asc.c_oAscCustomAutoFilter.isGreaterThanOrEqualTo;
					break;
				case "greaterThan":
					res = Asc.c_oAscCustomAutoFilter.isGreaterThan;
					break;
			}
		}

		return res;
	};

	AscCommonExcel.Filters.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("dateGroupItem" === name) {
				val = new AscCommonExcel.DateGroupItem();
				val.fromXml(reader);
				var autoFilterDateElem = new AscCommonExcel.AutoFilterDateElem();
				autoFilterDateElem.convertDateGroupItemToRange(val);
				this.Dates.push(autoFilterDateElem);
			} else if ("filter" === name) {
				val = new AscCommonExcel.Filter();
				val.fromXml(reader);
				if (null != val.Val) {
					this.Values[val.Val] = 1;
				}
			}
		}

		/*ReadAttributes( oReader );

		if ( oReader.IsEmptyNode() )
			return;

		int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if ( _T("dateGroupItem") == sName )
				m_arrItems.push_back( new CDateGroupItem(oReader));
			if ( _T("filter") == sName )
				m_arrItems.push_back( new CFilter(oReader));
		}*/

	};

	AscCommonExcel.Filters.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_Filters">
		39 <xsd:sequence>
		40 <xsd:element name="filter" type="CT_Filter" minOccurs="0" maxOccurs="unbounded"/>
		41 <xsd:element name="dateGroupItem" type="CT_DateGroupItem" minOccurs="0"
		42 maxOccurs="unbounded"/>
		43 </xsd:sequence>Annex A
		4409
		44 <xsd:attribute name="blank" type="xsd:boolean" use="optional" default="false"/>
		45 <xsd:attribute name="calendarType" type="s:ST_CalendarType" use="optional" default="none"/>
		46 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("blank"),      m_oBlank )*/

		//serialize
		/*    var res = c_oSerConstants.ReadOk;
		var oThis = this;
		if ( c_oSer_FilterColumn.Filter == type )
		{
			var oFilterVal = new AscCommonExcel.Filter();
			res = this.bcr.Read1(length, function(t,l){
				return oThis.ReadFilter(t,l, oFilterVal);
			});
			if(null != oFilterVal.Val)
				oFilters.Values[oFilterVal.Val] = 1;
		}
		else if ( c_oSer_FilterColumn.DateGroupItem == type )
		{
			var oDateGroupItem = new AscCommonExcel.DateGroupItem();
			res = this.bcr.Read2Spreadsheet(length, function(t,l){
				return oThis.ReadDateGroupItem(t,l, oDateGroupItem);
			});

			var autoFilterDateElem = new AscCommonExcel.AutoFilterDateElem();
			autoFilterDateElem.convertDateGroupItemToRange(oDateGroupItem);
			oFilters.Dates.push(autoFilterDateElem);
		}
		else if ( c_oSer_FilterColumn.FiltersBlank == type )
			oFilters.Blank = this.stream.GetBool();
		else
			res = c_oSerConstants.ReadUnknown;
		return res;*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("blank" === reader.GetName()) {
				val = reader.GetValueBool();
				this.Blank = val;
			}
		}
	};

	AscCommonExcel.Filters.prototype.toXml = function(writer) {


		/*if(!m_arrItems.empty() || m_oBlank.IsInit())
		{
			writer.StartNodeWithNS(node_ns, node_name);
			writer.StartAttributes();
			WritingStringNullableAttrBool(L"blank", m_oBlank);
			writer.EndAttributes();

			for ( size_t i = 0; i < m_arrItems.size(); ++i)
			{
				if (  m_arrItems[i] )
				{
					CFilter* pFilter = dynamic_cast<CFilter*>(m_arrItems[i]);
					CDateGroupItem* pDateGroupItem = dynamic_cast<CDateGroupItem*>(m_arrItems[i]);
					if(pFilter)
					{
						pFilter->toXMLWithNS(writer, child_ns, L"filter", child_ns);
					}
					else if(pDateGroupItem)
					{
						pDateGroupItem->toXMLWithNS(writer, child_ns, L"dateGroupItem", child_ns);
					}
				}
			}

			writer.EndNodeWithNS(node_ns, node_name);
		}*/

		writer.WriteXmlNodeStart("filters");

		writer.WriteXmlNullableAttributeBool("blank", this.Blank);
		writer.WriteXmlAttributesEnd();

		var i;
		if (this.Values) {
			for (i in this.Values) {
				writer.WriteXmlNodeStart("filter");

				writer.WriteXmlNullableAttributeStringEncode("val", i);
				writer.WriteXmlAttributesEnd();

				writer.WriteXmlNodeEnd("filter");
			}
		}
		if (this.Dates) {
			for (i = 0; i < this.Dates.length; i++) {
				this.Dates[i].toXml(writer);
			}
		}

		writer.WriteXmlNodeEnd("filters");

	};

	AscCommonExcel.DateGroupItem.prototype.fromXml = function (reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};

	AscCommonExcel.DateGroupItem.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:simpleType name="ST_DateTimeGrouping">
		193 <xsd:restriction base="xsd:string">
		194 <xsd:enumeration value="year"/>
		195 <xsd:enumeration value="month"/>
		196 <xsd:enumeration value="day"/>
		197 <xsd:enumeration value="hour"/>
		198 <xsd:enumeration value="minute"/>
		199 <xsd:enumeration value="second"/>
		200 </xsd:restriction>
		201 </xsd:simpleType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("dateTimeGrouping"),      m_oDateTimeGrouping )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("day"),      m_oDay )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("hour"),      m_oHour )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("minute"),      m_oMinute )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("month"),      m_oMonth )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("second"),      m_oSecond )
					WritingElement_ReadAttributes_Read_if     ( oReader, _T("year"),      m_oYear )*/

		//serialize
		/*   if ( c_oSer_DateGroupItem.DateTimeGrouping == type )
                oDateGroupItem.DateTimeGrouping = this.stream.GetUChar();
            else if ( c_oSer_DateGroupItem.Day == type )
                oDateGroupItem.Day = this.stream.GetULongLE();
            else if ( c_oSer_DateGroupItem.Hour == type )
                oDateGroupItem.Hour = this.stream.GetULongLE();
            else if ( c_oSer_DateGroupItem.Minute == type )
                oDateGroupItem.Minute = this.stream.GetULongLE();
            else if ( c_oSer_DateGroupItem.Month == type )
                oDateGroupItem.Month = this.stream.GetULongLE();
            else if ( c_oSer_DateGroupItem.Second == type )
                oDateGroupItem.Second = this.stream.GetULongLE();
            else if ( c_oSer_DateGroupItem.Year == type )
                oDateGroupItem.Year = this.stream.GetULongLE();
            else*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("dateTimeGrouping" === reader.GetName()) {
				val = reader.GetValue();
				this.DateTimeGrouping = val;
			} else if ("day" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.Day = val;
			} else if ("hour" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.Hour = val;
			} else if ("minute" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.Minute = val;
			} else if ("month" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.Month = val;
			} else if ("second" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.Second = val;
			} else if ("year" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.Year = val;
			}
		}
	};

	AscCommonExcel.DateGroupItem.prototype.toXml = function(writer) {


		/*writer.StartNodeWithNS(node_ns, node_name);
		writer.StartAttributes();
		WritingStringNullableAttrInt(L"year", m_oYear, m_oYear->GetValue());
		WritingStringNullableAttrInt(L"month", m_oMonth, m_oMonth->GetValue());
		WritingStringNullableAttrInt(L"day", m_oDay, m_oDay->GetValue());
		WritingStringNullableAttrInt(L"hour", m_oHour, m_oHour->GetValue());
		WritingStringNullableAttrInt(L"minute", m_oMinute, m_oMinute->GetValue());
		WritingStringNullableAttrInt(L"second", m_oSecond, m_oSecond->GetValue());
		WritingStringNullableAttrString(L"dateTimeGrouping", m_oDateTimeGrouping, m_oDateTimeGrouping->ToString());
		writer.EndAttributesAndNode();*/

		writer.WriteXmlNodeStart("dateGroupItem");

		writer.WriteXmlNullableAttributeNumber("year", this.Year);
		writer.WriteXmlNullableAttributeNumber("month", this.Month);
		writer.WriteXmlNullableAttributeNumber("day", this.Day);
		writer.WriteXmlNullableAttributeNumber("hour", this.Hour);
		writer.WriteXmlNullableAttributeNumber("minute", this.Minute);
		writer.WriteXmlNullableAttributeNumber("second", this.Second);
		writer.WriteXmlNullableAttributeString("dateTimeGrouping", this.DateTimeGrouping);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("dateGroupItem");

	};

	AscCommonExcel.Filter.prototype.fromXml = function (reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();
	};

	AscCommonExcel.Filter.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:attribute name="val" type="s:ST_Xstring"/>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("val"),      m_oVal )*/

		//serialize
		/*    var res = c_oSerConstants.ReadOk;
            if ( c_oSer_Filter.Val == type )
                oFilter.Val = this.stream.GetString2LE(length);*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("val" === reader.GetName()) {
				val = reader.GetValue();
				this.Val = val;
			}
		}
	};

	AscCommonExcel.Filter.prototype.toXml = function(writer) {

		/*if(m_oVal.IsInit())
		{
			writer.StartNodeWithNS(node_ns, node_name);
			writer.StartAttributes();
			WritingStringAttrEncodeXmlString(L"val", *m_oVal);
			writer.EndAttributesAndNode();
		}*/

		writer.WriteXmlNodeStart("filter");

		writer.WriteXmlNullableAttributeStringEncode("val", this.Val);
		writer.WriteXmlAttributesEnd();

		writer.WriteXmlNodeEnd("filter");

	};


	/*void CDataValidations::fromXML(XmlUtils::CXmlLiteReader& oReader)
	{
		ReadAttributes( oReader );

		if ( oReader.IsEmptyNode() )
			return;

		int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if ( L"dataValidation" == sName )
			{
				m_arrItems.push_back( new CDataValidation( oReader ));
			}
		}
	}

	void CDataValidations::ReadAttributes(XmlUtils::CXmlLiteReader& oReader)
	{
		WritingElement_ReadAttributes_Start( oReader )
		WritingElement_ReadAttributes_Read_if		( oReader, L"count",	m_oCount)
		WritingElement_ReadAttributes_Read_else_if	( oReader, L"disablePrompts",m_oDisablePrompts)
		WritingElement_ReadAttributes_Read_else_if	( oReader, L"xWindow",	m_oXWindow)
		WritingElement_ReadAttributes_Read_else_if	( oReader, L"yWindow",	m_oYWindow)
		WritingElement_ReadAttributes_End( oReader )
	}*/

	AscCommonExcel.CDataValidations.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("dataValidation" === name) {
				val = new AscCommonExcel.CDataValidation();
				val.fromXml(reader);
				this.elems.push(val);
			}
		}

		/*void CDataValidations::fromXML(XmlUtils::CXmlLiteReader& oReader)
		{
			ReadAttributes( oReader );

			if ( oReader.IsEmptyNode() )
				return;

			int nCurDepth = oReader.GetDepth();
			while( oReader.ReadNextSiblingNode( nCurDepth ) )
			{
				std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

				if ( L"dataValidation" == sName )
				{
					m_arrItems.push_back( new CDataValidation( oReader ));
				}
			}
		}*/
	};

	AscCommonExcel.CDataValidations.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_DataValidations">
			2595 <xsd:sequence>
			2596 <xsd:element name="dataValidation" type="CT_DataValidation" minOccurs="1"
			2597 maxOccurs="unbounded"/>
			2598 </xsd:sequence>
			2599 <xsd:attribute name="disablePrompts" type="xsd:boolean" use="optional" default="false"/>
			2600 <xsd:attribute name="xWindow" type="xsd:unsignedInt" use="optional"/>
			2601 <xsd:attribute name="yWindow" type="xsd:unsignedInt" use="optional"/>
			2602 <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
			2603 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Start( oReader )
			WritingElement_ReadAttributes_Read_if		( oReader, L"count",	m_oCount)
			WritingElement_ReadAttributes_Read_else_if	( oReader, L"disablePrompts",m_oDisablePrompts)
			WritingElement_ReadAttributes_Read_else_if	( oReader, L"xWindow",	m_oXWindow)
			WritingElement_ReadAttributes_Read_else_if	( oReader, L"yWindow",	m_oYWindow)
			WritingElement_ReadAttributes_End( oReader )*/

		//serialize
		/*   var res = c_oSerConstants.ReadOk;
			var oThis = this;
			if (c_oSer_DataValidation.DataValidations == type) {
				res = this.bcr.Read1(length, function(t, l) {
					return oThis.ReadDataValidationsContent(t, l, dataValidations);
				});
			} else if (c_oSer_DataValidation.DisablePrompts == type) {
				dataValidations.disablePrompts = this.stream.GetBool();
			} else if (c_oSer_DataValidation.XWindow == type) {
				dataValidations.xWindow = this.stream.GetLong();
			} else if (c_oSer_DataValidation.YWindow == type) {
				dataValidations.yWindow = this.stream.GetLong();
            } else
                res = c_oSerConstants.ReadUnknown;
            return res;*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("disablePrompts" === reader.GetName()) {
				val = reader.GetValueBool();
				this.disablePrompts = val;
			} else if ("XWindow" === reader.GetName()) {
				val = reader.GetValueInt();
				this.XWindow = val;
			} else if ("yWindow" === reader.GetName()) {
				val = reader.GetValueInt();
				this.yWindow = val;
			}
		}
	};


	AscCommonExcel.CDataValidations.prototype.toXml = function(writer, bExtendedWrite) {
		/*void CDataValidations::toXML2(NSStringUtils::CStringBuilder& writer, bool bExtendedWrite) const
			{
				if (m_arrItems.empty()) return;

				if (false == m_oCount.IsInit())
				{
					m_oCount = (int)m_arrItems.size();
				}
				std::wstring node_name = bExtendedWrite ? L"x14:dataValidations" : L"dataValidations";

				writer.WriteString(L"<" + node_name);
				if (bExtendedWrite)
				{
					WritingStringAttrString(L"xmlns:xm", L"http://schemas.microsoft.com/office/excel/2006/main");
				}
				WritingStringNullableAttrInt(L"count",			m_oCount,			*m_oCount);
				WritingStringNullableAttrInt(L"disablePrompts", m_oDisablePrompts,	m_oDisablePrompts->GetValue());
				WritingStringNullableAttrInt(L"xWindow",		m_oXWindow,			m_oXWindow->GetValue());
				WritingStringNullableAttrInt(L"yWindow",		m_oYWindow,			m_oYWindow->GetValue());
				writer.WriteString(L">");
				for ( size_t i = 0; i < m_arrItems.size(); ++i)
				{
					if ( m_arrItems[i] )
					{
						m_arrItems[i]->toXML2(writer, bExtendedWrite);
					}
				}
				writer.WriteString(L"</" + node_name + L">");
			}*/
		if (!this.elems || !this.elems.length) {
			return;
		}

		var node_name = bExtendedWrite ? "x14:dataValidations" : "dataValidations";
		writer.WriteXmlString("<" + node_name);
		if (bExtendedWrite) {
			writer.WriteXmlAttributeString("xmlns:xm", "http://schemas.microsoft.com/office/excel/2006/main");
		}

		writer.WriteXmlNullableAttributeNumber("count", this.elems.length);
		writer.WriteXmlNullableAttributeNumber("disablePrompts", this.disablePrompts);
		writer.WriteXmlNullableAttributeNumber("xWindow", this.xWindow);
		writer.WriteXmlNullableAttributeNumber("yWindow", this.yWindow);
		writer.WriteXmlAttributesEnd();

		for (var i = 0; i < this.elems.length; ++i) {
			this.elems[i].toXml(writer);
		}

		writer.WriteXmlString("</" + node_name + ">");
	};


	AscCommonExcel.CDataValidation.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		//TODO EXT x14:
		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("formula1" === name) {
				val = new Asc.CDataFormula(reader.GetText());
				this.formula1 = val;
			} else if ("formula2" === name) {
				val = new Asc.CDataFormula(reader.GetText());
				this.formula2 = val;
			} else if ("sqref" === name) {
				this.setSqRef(reader.GetText());
			}
			//--------------------------------------------------- xml spreadsheet 2002
			else if ("Range" == name) {
				/*r1c1_formula_convert::base_row = 1;
				r1c1_formula_convert::base_col = 1;

				r1c1_formula_convert convert;

				m_oSqRef = convert.convert(oReader.GetText2());*/
			} else if ("Type" == name) {
				/*m_oType = oReader.GetText2();

				m_oAllowBlank.Init();
				m_oAllowBlank->FromBool(true);

				m_oShowInputMessage.Init();
				m_oShowInputMessage->FromBool(true);*/
			} else if ("Value" == name) {
				/*r1c1_formula_convert::base_row = 1;
				r1c1_formula_convert::base_col = 1;

				r1c1_formula_convert convert;

				m_oFormula1 = new CDataValidationFormula(m_pMainDocument);
				m_oFormula1->m_sText = convert.convert(oReader.GetText3());*/
			}
		}

		/*void CDataValidation::fromXML(XmlUtils::CXmlLiteReader& oReader)
		{
			ReadAttributes( oReader );

			if ( oReader.IsEmptyNode() )
				return;

			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
				if (L"formula1" == sName)
				{
					m_oFormula1 = oReader;
				}
			else if (L"formula2" == sName)
				{
					m_oFormula2 = oReader;
				}
			else if (L"sqref" == sName)
				{
					m_oSqRef = oReader.GetText2();
				}
//--------------------------------------------------- xml spreadsheet 2002
			else if (L"Range" == sName)
				{
					r1c1_formula_convert::base_row = 1;
					r1c1_formula_convert::base_col = 1;

					r1c1_formula_convert convert;

					m_oSqRef = convert.convert(oReader.GetText2());
				}
			else if (L"Type" == sName)
				{
					m_oType = oReader.GetText2();

					m_oAllowBlank.Init();
					m_oAllowBlank->FromBool(true);

					m_oShowInputMessage.Init();
					m_oShowInputMessage->FromBool(true);
				}
			else if (L"Value" == sName)
				{
					r1c1_formula_convert::base_row = 1;
					r1c1_formula_convert::base_col = 1;

					r1c1_formula_convert convert;

					m_oFormula1 = new CDataValidationFormula(m_pMainDocument);
					m_oFormula1->m_sText = convert.convert(oReader.GetText3());

					//if (m_oFormula1->m_sText.find(L"!") == std::wstring::npos)
					//{
					//	CXlsxFlat* xlsx_flat = dynamic_cast<CXlsxFlat*>(m_pMainDocument);
					//	if (xlsx_flat)
					//	{
					//		CSheet *pSheet = xlsx_flat->m_pWorkbook->m_oSheets->m_arrItems.back();
					//		if (pSheet->m_oName.IsInit())
					//		{
					//			m_oFormula1->m_sText = *pSheet->m_oName + L"!" + m_oFormula1->m_sText;
					//		}
					//	}
					//}
				}
			}
		}*/
	};

	AscCommonExcel.CDataValidation.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_DataValidation">
			2605 <xsd:sequence>
			2606 <xsd:element name="formula1" type="ST_Formula" minOccurs="0" maxOccurs="1"/>
			2607 <xsd:element name="formula2" type="ST_Formula" minOccurs="0" maxOccurs="1"/>
			2608 </xsd:sequence>
			2609 <xsd:attribute name="type" type="ST_DataValidationType" use="optional" default="none"/>
			2610 <xsd:attribute name="errorStyle" type="ST_DataValidationErrorStyle" use="optional"
			2611 default="stop"/>
			2612 <xsd:attribute name="imeMode" type="ST_DataValidationImeMode" use="optional"
			2613 default="noControl"/>
			2614 <xsd:attribute name="operator" type="ST_DataValidationOperator" use="optional"
			2615 default="between"/>
			2616 <xsd:attribute name="allowBlank" type="xsd:boolean" use="optional" default="false"/>
			2617 <xsd:attribute name="showDropDown" type="xsd:boolean" use="optional" default="false"/>
			2618 <xsd:attribute name="showInputMessage" type="xsd:boolean" use="optional" default="false"/>
			2619 <xsd:attribute name="showErrorMessage" type="xsd:boolean" use="optional" default="false"/>
			2620 <xsd:attribute name="errorTitle" type="s:ST_Xstring" use="optional"/>
			2621 <xsd:attribute name="error" type="s:ST_Xstring" use="optional"/>
			2622 <xsd:attribute name="promptTitle" type="s:ST_Xstring" use="optional"/>
			2623 <xsd:attribute name="prompt" type="s:ST_Xstring" use="optional"/>
			2624 <xsd:attribute name="sqref" type="ST_Sqref" use="required"/>
			2625 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_StartChar( oReader )
			WritingElement_ReadAttributes_Read_ifChar		( oReader, "allowBlank",	m_oAllowBlank)
			else if ( strcmp("error", wsName) == 0 )
			{
				m_oError = oReader.GetAttributeTextWithHHHH();
			}
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "errorStyle",	m_oErrorStyle)
			else if ( strcmp("errorTitle", wsName) == 0 )
			{
				m_oErrorTitle = oReader.GetAttributeTextWithHHHH();
			}
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "imeMode",		m_oImeMode)
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "operator",		m_oOperator)
			else if ( strcmp("prompt", wsName) == 0 )
			{
				m_oPrompt = oReader.GetAttributeTextWithHHHH();
			}
			else if ( strcmp("promptTitle", wsName) == 0 )
			{
				m_oPromptTitle = oReader.GetAttributeTextWithHHHH();
			}
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "showDropDown",	m_oShowDropDown)
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "showErrorMessage",m_oShowErrorMessage)
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "showInputMessage",m_oShowInputMessage)
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "sqref",			m_oSqRef)
			WritingElement_ReadAttributes_Read_else_ifChar	( oReader, "type",			m_oType)
			WritingElement_ReadAttributes_EndChar( oReader )*/

		//serialize
		/*  var res = c_oSerConstants.ReadOk;
			if (c_oSer_DataValidation.AllowBlank == type) {
				dataValidation.allowBlank = this.stream.GetBool();
			} else if (c_oSer_DataValidation.Type == type) {
				dataValidation.type = this.stream.GetUChar();
			} else if (c_oSer_DataValidation.Error == type) {
				dataValidation.error = this.stream.GetString2LE(length);
			} else if (c_oSer_DataValidation.ErrorTitle == type) {
				dataValidation.errorTitle = this.stream.GetString2LE(length);
			} else if (c_oSer_DataValidation.ErrorStyle == type) {
				dataValidation.errorStyle = this.stream.GetUChar();
			} else if (c_oSer_DataValidation.ImeMode == type) {
				dataValidation.imeMode = this.stream.GetUChar();
			} else if (c_oSer_DataValidation.Operator == type) {
				dataValidation.operator = this.stream.GetUChar();
			} else if (c_oSer_DataValidation.Prompt == type) {
				dataValidation.prompt = this.stream.GetString2LE(length);
			} else if (c_oSer_DataValidation.PromptTitle == type) {
				dataValidation.promptTitle = this.stream.GetString2LE(length);
			} else if (c_oSer_DataValidation.ShowDropDown == type) {
				dataValidation.showDropDown = this.stream.GetBool();
			} else if (c_oSer_DataValidation.ShowErrorMessage == type) {
				dataValidation.showErrorMessage = this.stream.GetBool();
			} else if (c_oSer_DataValidation.ShowInputMessage == type) {
				dataValidation.showInputMessage = this.stream.GetBool();
			} else if (c_oSer_DataValidation.SqRef == type) {
			    dataValidation.setSqRef(this.stream.GetString2LE(length));
			} else if (c_oSer_DataValidation.Formula1 == type) {
			    dataValidation.formula1 = new Asc.CDataFormula(this.stream.GetString2LE(length));
			} else if (c_oSer_DataValidation.Formula2 == type) {
                dataValidation.formula2 = new Asc.CDataFormula(this.stream.GetString2LE(length));
			} else
				res = c_oSerConstants.ReadUnknown;
			return res;*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("allowBlank" === reader.GetName()) {
				val = reader.GetValueBool();
				this.allowBlank = val;
			} else if ("error" === reader.GetName()) {
				val = reader.GetValue();
				this.error = val;
			} else if ("errorStyle" === reader.GetName()) {
				val = reader.GetValue();
				this.errorStyle = val;
			} else if ("errorTitle" === reader.GetName()) {
				val = reader.GetValue();
				this.errorTitle = val;
			} else if ("imeMode" === reader.GetName()) {
				val = reader.GetValue();
				this.imeMode = val;
			} else if ("operator" === reader.GetName()) {
				val = reader.GetValue();
				this.operator = val;
			} else if ("prompt" === reader.GetName()) {
				val = reader.GetValue();
				this.prompt = val;
			} else if ("promptTitle" === reader.GetName()) {
				val = reader.GetValue();
				this.promptTitle = val;
			} else if ("showDropDown" === reader.GetName()) {
				val = reader.GetValueBool();
				this.showDropDown = val;
			} else if ("showErrorMessage" === reader.GetName()) {
				val = reader.GetValueBool();
				this.showErrorMessage = val;
			} else if ("showInputMessage" === reader.GetName()) {
				val = reader.GetValueBool();
				this.showInputMessage = val;
			} else if ("sqref" === reader.GetName()) {
				val = reader.GetValue();
				this.setSqRef(val);
			} else if ("type" === reader.GetName()) {
				val = reader.GetValue();
				this.type = val;
			}
		}
	};


	//COfficeArtExtensionList

	/*virtual void fromXML(XmlUtils::CXmlLiteReader& oReader)
	{
		if ( oReader.IsEmptyNode() )
			return;

		int nCurDepth = oReader.GetDepth();
		while( oReader.ReadNextSiblingNode( nCurDepth ) )
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
			if ( _T("ext") == sName )
			{
				OOX::Drawing::COfficeArtExtension *oExt = new OOX::Drawing::COfficeArtExtension(oReader);
				if (oExt) m_arrExt.push_back( oExt );
			}
		}
	}*/

	AscCommonExcel.CDataValidation.prototype.isExtended = function() {
		var result1 = true, result2 = true;
		if (this.formula1) {
			if (this.formula1.text.indexOf("!") !== -1 && this.formula1.text !== "#REF!") {
				result1 = false;
			}
		} else {
			result1 = false;
		}

		if (this.formula2) {
			if (this.formula2.text.indexOf("!") !== -1 && this.formula2.text !== "#REF!") {
				result1 = false;
			}
		} else {
			result2 = false;
		}

		return result1 || result2;
	};


	Asc.asc_CPageSetup.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.asc_CPageSetup.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="paperSize" type="xsd:unsignedInt" use="optional" default="1"/>
		2843 <xsd:attribute name="paperHeight" type="s:ST_PositiveUniversalMeasure" use="optional"/>
		2844 <xsd:attribute name="paperWidth" type="s:ST_PositiveUniversalMeasure" use="optional"/>
		2845 <xsd:attribute name="scale" type="xsd:unsignedInt" use="optional" default="100"/>
		2846 <xsd:attribute name="firstPageNumber" type="xsd:unsignedInt" use="optional" default="1"/>
		2847 <xsd:attribute name="fitToWidth" type="xsd:unsignedInt" use="optional" default="1"/>
		2848 <xsd:attribute name="fitToHeight" type="xsd:unsignedInt" use="optional" default="1"/>
		2849 <xsd:attribute name="pageOrder" type="ST_PageOrder" use="optional" default="downThenOver"/>
		2850 <xsd:attribute name="orientation" type="ST_Orientation" use="optional" default="default"/>
		2851 <xsd:attribute name="usePrinterDefaults" type="xsd:boolean" use="optional" default="true"/>ECMA-376 Part 1
		4462
		2852 <xsd:attribute name="blackAndWhite" type="xsd:boolean" use="optional" default="false"/>
		2853 <xsd:attribute name="draft" type="xsd:boolean" use="optional" default="false"/>
		2854 <xsd:attribute name="cellComments" type="ST_CellComments" use="optional" default="none"/>
		2855 <xsd:attribute name="useFirstPageNumber" type="xsd:boolean" use="optional" default="false"/>
		2856 <xsd:attribute name="errors" type="ST_PrintError" use="optional" default="displayed"/>
		2857 <xsd:attribute name="horizontalDpi" type="xsd:unsignedInt" use="optional" default="600"/>
		2858 <xsd:attribute name="verticalDpi" type="xsd:unsignedInt" use="optional" default="600"/>
		2859 <xsd:attribute name="copies" type="xsd:unsignedInt" use="optional" default="1"/>
		2860 <xsd:attribute ref="r:id" use="optional"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"blackAndWhite"),	m_oBlackAndWhite)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"cellComments"),	m_oCellComments)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"copies"),			m_oCopies)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"draft"),			m_oDraft)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"errors"),			m_oErrors)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"firstPageNumber"),m_oFirstPageNumber)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"fitToHeight"),	m_oFitToHeight)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"fitToWidth"),		m_oFitToWidth)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"horizontalDpi"),	m_oHorizontalDpi)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"r:id"),			m_oRId)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"relationships:id"), m_oRId)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"orientation"),	m_oOrientation)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"pageOrder"),		m_oPageOrder)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"paperHeight"),	m_oPaperHeight)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"paperSize"),		m_oPaperSize)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"paperWidth"),		m_oPaperWidth)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"paperUnits"),		m_oPaperUnits)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"scale"),			m_oScale)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"useFirstPageNumber"),	m_oUseFirstPageNumber)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"usePrinterDefaults"),	m_oUsePrinterDefaults)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"verticalDpi"),	m_oVerticalDpi)*/

//serialize
		/* var res = c_oSerConstants.ReadOk;
					if (c_oSer_PageSetup.BlackAndWhite === type) {
						oPageSetup.blackAndWhite = this.stream.GetBool();
					} else if ( c_oSer_PageSetup.CellComments == type ) {
						oPageSetup.cellComments = this.stream.GetUChar();
					} else if ( c_oSer_PageSetup.Copies == type ) {
						oPageSetup.copies = this.stream.GetULongLE();
					} else if ( c_oSer_PageSetup.Draft == type ) {
						oPageSetup.draft = this.stream.GetBool();
					} else if ( c_oSer_PageSetup.Errors == type ) {
						oPageSetup.errors = this.stream.GetUChar();
					} else if ( c_oSer_PageSetup.FirstPageNumber == type ) {
						oPageSetup.firstPageNumber = this.stream.GetULongLE();
					} else if ( c_oSer_PageSetup.FitToHeight == type ) {
						oPageSetup.fitToHeight = this.stream.GetULongLE();
					} else if ( c_oSer_PageSetup.FitToWidth == type ) {
						oPageSetup.fitToWidth = this.stream.GetULongLE();
					} else if ( c_oSer_PageSetup.HorizontalDpi == type ) {
						oPageSetup.horizontalDpi = this.stream.GetULongLE();
					} else if ( c_oSer_PageSetup.Orientation == type ) {
						var byteFormatOrientation = this.stream.GetUChar();
						var byteOrientation = null;
						switch(byteFormatOrientation)
						{
							case EPageOrientation.pageorientPortrait: byteOrientation = c_oAscPageOrientation.PagePortrait;break;
							case EPageOrientation.pageorientLandscape: byteOrientation = c_oAscPageOrientation.PageLandscape;break;
						}
						if(null != byteOrientation)
							oPageSetup.asc_setOrientation(byteOrientation);
					} else if ( c_oSer_PageSetup.PageOrder == type ) {
						oPageSetup.pageOrder = this.stream.GetUChar();
					// } else if ( c_oSer_PageSetup.PaperHeight == type ) {
					//     oPageSetup.height = this.stream.GetDoubleLE();
					} else if ( c_oSer_PageSetup.PaperSize == type ) {
						var bytePaperSize = this.stream.GetUChar();
						var item = DocumentPageSize.getSizeById(bytePaperSize);
						oPageSetup.asc_setWidth(item.w_mm);
						oPageSetup.asc_setHeight(item.h_mm);
					// } else if ( c_oSer_PageSetup.PaperWidth == type ) {
					//     oPageSetup.width = this.stream.GetDoubleLE();
					// } else if ( c_oSer_PageSetup.PaperUnits == type ) {
					//     oPageSetup.paperUnits = this.stream.GetUChar();
					} else if ( c_oSer_PageSetup.Scale == type ) {
						oPageSetup.scale = this.stream.GetULongLE();
					} else if ( c_oSer_PageSetup.UseFirstPageNumber == type ) {
						oPageSetup.useFirstPageNumber = this.stream.GetBool();
					} else if ( c_oSer_PageSetup.UsePrinterDefaults == type ) {
						oPageSetup.usePrinterDefaults = this.stream.GetBool();
					} else if ( c_oSer_PageSetup.VerticalDpi == type ) {
						oPageSetup.verticalDpi = this.stream.GetULongLE();
					} else
						res = c_oSerConstants.ReadUnknown;
					return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("blackAndWhite" === reader.GetName()) {
				val = reader.GetValueBool();
				this.blackAndWhite = val;
			} else if ("cellComments" === reader.GetName()) {
				val = reader.GetValue();
				this.cellComments = val;
			} else if ("copies" === reader.GetName()) {
				val = reader.GetValueInt();
				this.copies = val;
			} else if ("draft" === reader.GetName()) {
				val = reader.GetValueBool();
				this.draft = val;
			} else if ("errors" === reader.GetName()) {
				val = reader.GetValueInt();
				this.errors = val;
			} else if ("firstPageNumber" === reader.GetName()) {
				val = reader.GetValueInt();
				this.firstPageNumber = val;
			} else if ("fitToHeight" === reader.GetName()) {
				val = reader.GetValueInt();
				this.fitToHeight = val;
			} else if ("fitToWidth" === reader.GetName()) {
				val = reader.GetValueInt();
				this.fitToWidth = val;
			} else if ("horizontalDpi" === reader.GetName()) {
				val = reader.GetValueInt();
				this.horizontalDpi = val;
			} /*else if ("r:id" === reader.GetName()) {
				val = reader.GetValue();
				this.r:id = val;
			} else if ("relationships:id" === reader.GetName()) {
				val = reader.GetValue();
				this.relationships:id = val;
			}*/ else if ("orientation" === reader.GetName()) {
				//TODO в serialize такая же обработка, нужно сделать общую
				var byteFormatOrientation = reader.GetValue();
				var byteOrientation = null;
				switch (byteFormatOrientation) {
					case Asc.EPageOrientation.pageorientPortrait:
						byteOrientation = c_oAscPageOrientation.PagePortrait;
						break;
					case Asc.EPageOrientation.pageorientLandscape:
						byteOrientation = c_oAscPageOrientation.PageLandscape;
						break;
				}
				if (null != byteOrientation) {
					this.asc_setOrientation(byteOrientation);
				}
			} else if ("pageOrder" === reader.GetName()) {
				val = reader.GetValue();
				this.PageOrder = val;
			} else if ("paperHeight" === reader.GetName()) {
				val = reader.GetValue();
				this.PaperHeight = val;
			} else if ("paperSize" === reader.GetName()) {
				//TODO в serialize такая же обработка, нужно сделать общую
				var bytePaperSize = reader.GetValueInt();
				var item = AscCommonExcel.DocumentPageSize.getSizeById(bytePaperSize);
				this.asc_setWidth(item.w_mm);
				this.asc_setHeight(item.h_mm);
			} else if ("paperWidth" === reader.GetName()) {
				val = reader.GetValue();
				this.PaperWidth = val;
			} else if ("paperUnits" === reader.GetName()) {
				val = reader.GetValue();
				this.PaperUnits = val;
			} else if ("scale" === reader.GetName()) {
				val = reader.GetValueInt();
				this.Scale = val;
			} else if ("useFirstPageNumber" === reader.GetName()) {
				val = reader.GetValueBool();
				this.UseFirstPageNumber = val;
			} else if ("usePrinterDefaults" === reader.GetName()) {
				val = reader.GetValueBool();
				this.UsePrinterDefaults = val;
			} else if ("verticalDpi" === reader.GetName()) {
				val = reader.GetValueInt();
				this.VerticalDpi = val;
			}
		}
	};

	Asc.asc_CPageMargins.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.asc_CPageMargins.prototype.readAttr = function (reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("left" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.asc_setLeft(val);
			} else if ("top" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.asc_setTop(val);
			} else if ("right" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.asc_setRight(val);
			} else if ("bottom" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.asc_setBottom(val);
			} else if ("header" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.asc_setHeader(val);
			} else if ("footer" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.asc_setFooter(val);
			}
		}
	};

	Asc.asc_CPageOptions.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.asc_CPageOptions.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="horizontalCentered" type="xsd:boolean" use="optional" default="false"/>
		2836 <xsd:attribute name="verticalCentered" type="xsd:boolean" use="optional" default="false"/>
		2837 <xsd:attribute name="headings" type="xsd:boolean" use="optional" default="false"/>
		2838 <xsd:attribute name="gridLines" type="xsd:boolean" use="optional" default="false"/>
		2839 <xsd:attribute name="gridLinesSet" type="xsd:boolean" use="optional" default="true"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"gridLines"),			m_oGridLines)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"gridLinesSet"),		m_oGridLinesSet)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"headings"),			m_oHeadings)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"horizontalCentered"),	m_oHorizontalCentered)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"verticalCentered"),	m_oVerticalCentered)*/

//serialize
		/*  if ( c_oSer_PrintOptions.GridLines == type )
						oPrintOptions.asc_setGridLines(this.stream.GetBool());
					else if ( c_oSer_PrintOptions.Headings == type )
						oPrintOptions.asc_setHeadings(this.stream.GetBool());
					else*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("gridLines" === reader.GetName()) {
				val = reader.GetValueBool();
				this.asc_setGridLines(val);
			} /*else if ("gridLinesSet" === reader.GetName()) {
				val = reader.GetValueBool();
				this.gridLinesSet = val;
			}*/ else if ("headings" === reader.GetName()) {
				val = reader.GetValueBool();
				this.asc_setHeadings(val);
			} /*else if ("horizontalCentered" === reader.GetName()) {
				val = reader.GetValueBool();
				this.horizontalCentered = val;
			} else if ("verticalCentered" === reader.GetName()) {
				val = reader.GetValueBool();
				this.verticalCentered = val;
			}*/
		}
	};

	AscCommonExcel.SheetFormatPr.prototype.fromXml = function (reader, oWorksheet) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader, oWorksheet);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	AscCommonExcel.SheetFormatPr.prototype.readAttr = function (reader, oWorksheet) {

//documentation
		/*<xsd:attribute name="baseColWidth" type="xsd:unsignedInt" use="optional" default="8"/>
		2246 <xsd:attribute name="defaultColWidth" type="xsd:double" use="optional"/>
		2247 <xsd:attribute name="defaultRowHeight" type="xsd:double" use="required"/>
		2248 <xsd:attribute name="customHeight" type="xsd:boolean" use="optional" default="false"/>
		2249 <xsd:attribute name="zeroHeight" type="xsd:boolean" use="optional" default="false"/>
		2250 <xsd:attribute name="thickTop" type="xsd:boolean" use="optional" default="false"/>
		2251 <xsd:attribute name="thickBottom" type="xsd:boolean" use="optional" default="false"/>
		2252 <xsd:attribute name="outlineLevelRow" type="xsd:unsignedByte" use="optional" default="0"/>
		2253 <xsd:attribute name="outlineLevelCol" type="xsd:unsignedByte" use="optional" default="0"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"baseColWidth"),		m_oBaseColWidth)	// ToDo Excel не воспринимает значения не uint (мы приводим к uint)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"customHeight"),		m_oCustomHeight )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"defaultColWidth"),		m_oDefaultColWidth )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"defaultRowHeight"),	m_oDefaultRowHeight )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"outlineLevelCol"),		m_oOutlineLevelCol )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"outlineLevelRow"),		m_oOutlineLevelRow )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"thickBottom"),			m_oThickBottom )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"thickTop"),			m_oThickTop )
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"zeroHeight"),			m_oZeroHeight )*/

//serialize
		/* if ( c_oSerSheetFormatPrTypes.DefaultColWidth == type )
						oWorksheet.oSheetFormatPr.dDefaultColWidth = this.stream.GetDoubleLE();
					else if (c_oSerSheetFormatPrTypes.BaseColWidth === type)
						oWorksheet.oSheetFormatPr.nBaseColWidth = this.stream.GetULongLE();
					else if ( c_oSerSheetFormatPrTypes.DefaultRowHeight == type )
					{
						var oAllRow = oWorksheet.getAllRow();
						oAllRow.setHeight(this.stream.GetDoubleLE());
					}
					else if ( c_oSerSheetFormatPrTypes.CustomHeight == type )
					{
						var oAllRow = oWorksheet.getAllRow();
						var CustomHeight = this.stream.GetBool();
						if(CustomHeight)
							oAllRow.setCustomHeight(true);
					}
					else if ( c_oSerSheetFormatPrTypes.ZeroHeight == type )
					{
						var oAllRow = oWorksheet.getAllRow();
						var hd = this.stream.GetBool();
						if(hd)
							oAllRow.setHidden(true);
					}
					else if ( c_oSerSheetFormatPrTypes.OutlineLevelCol == type )
					{
						oWorksheet.oSheetFormatPr.nOutlineLevelCol = this.stream.GetULongLE();
					}
					else if ( c_oSerSheetFormatPrTypes.OutlineLevelRow == type )
					{
						var oAllRow = oWorksheet.getAllRow();
						oAllRow.setOutlineLevel(this.stream.GetULongLE());
					}*/

		var val;
		var oAllRow;
		while (reader.MoveToNextAttribute()) {
			if ("baseColWidth" === reader.GetName()) {
				val = reader.GetValueInt();
				this.nBaseColWidth = val;
			} else if ("customHeight" === reader.GetName()) {
				oAllRow = oWorksheet.getAllRow();
				var CustomHeight = reader.GetValueBool();
				if (CustomHeight) {
					oAllRow.setCustomHeight(true);
				}
			} else if ("defaultColWidth" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.dDefaultColWidth = val;
			} else if ("defaultRowHeight" === reader.GetName()) {
				oAllRow = oWorksheet.getAllRow();
				oAllRow.setHeight(reader.GetValueDouble());
			} else if ("outlineLevelCol" === reader.GetName()) {
				val = reader.GetValueInt();
				this.nOutlineLevelCol = val;
			} else if ("outlineLevelRow" === reader.GetName()) {
				oAllRow = oWorksheet.getAllRow();
				oAllRow.setOutlineLevel(reader.GetValueInt());
			} /*else if ("thickBottom" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ThickBottom = val;
			} else if ("thickTop" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ThickTop = val;
			}*/ else if ("zeroHeight" === reader.GetName()) {
				oAllRow = oWorksheet.getAllRow();
				var hd = reader.GetValueBool();
				if (hd) {
					oAllRow.setHidden(true);
				}
			}
		}
	};

	AscCommonExcel.asc_CSheetViewSettings.prototype.fromXml = function (reader, ws) {

		/*ReadAttributes( oReader );

						if (oReader.IsEmptyNode())
							return;

						int nCurDepth = oReader.GetDepth();
						while (oReader.ReadNextSiblingNode(nCurDepth))
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if (L"pane" == sName)
								m_oPane = oReader;
							if (L"selection" == sName)
							{
								m_arrItems.push_back(new CSelection(oReader));
							}
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("pane" === name) {
				this.pane = new AscCommonExcel.asc_CPane();
				this.pane.fromXml(reader);
			} else if ("selection" === name) {
				ws.selectionRange.clean();
				ws.selectionRange.fromXml(reader);
				ws.selectionRange.update();
			}
		}
	};

	AscCommonExcel.asc_CSheetViewSettings.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:sequence>
		2357 <xsd:element name="pane" type="CT_Pane" minOccurs="0" maxOccurs="1"/>
		2358 <xsd:element name="selection" type="CT_Selection" minOccurs="0" maxOccurs="4"/>
		2359 <xsd:element name="pivotSelection" type="CT_PivotSelection" minOccurs="0" maxOccurs="4"/>
		2360 <xsd:element name="extLst" minOccurs="0" maxOccurs="1" type="CT_ExtensionList"/>
		2361 </xsd:sequence>
		2362 <xsd:attribute name="windowProtection" type="xsd:boolean" use="optional" default="false"/>
		2363 <xsd:attribute name="showFormulas" type="xsd:boolean" use="optional" default="false"/>
		2364 <xsd:attribute name="showGridLines" type="xsd:boolean" use="optional" default="true"/>
		2365 <xsd:attribute name="showRowColHeaders" type="xsd:boolean" use="optional" default="true"/>
		2366 <xsd:attribute name="showZeros" type="xsd:boolean" use="optional" default="true"/>
		2367 <xsd:attribute name="rightToLeft" type="xsd:boolean" use="optional" default="false"/>
		2368 <xsd:attribute name="tabSelected" type="xsd:boolean" use="optional" default="false"/>
		2369 <xsd:attribute name="showRuler" type="xsd:boolean" use="optional" default="true"/>
		2370 <xsd:attribute name="showOutlineSymbols" type="xsd:boolean" use="optional" default="true"/>
		2371 <xsd:attribute name="defaultGridColor" type="xsd:boolean" use="optional" default="true"/>
		2372 <xsd:attribute name="showWhiteSpace" type="xsd:boolean" use="optional" default="true"/>
		2373 <xsd:attribute name="view" type="ST_SheetViewType" use="optional" default="normal"/>
		2374 <xsd:attribute name="topLeftCell" type="ST_CellRef" use="optional"/>Annex A
		4453
		2375 <xsd:attribute name="colorId" type="xsd:unsignedInt" use="optional" default="64"/>
		2376 <xsd:attribute name="zoomScale" type="xsd:unsignedInt" use="optional" default="100"/>
		2377 <xsd:attribute name="zoomScaleNormal" type="xsd:unsignedInt" use="optional" default="0"/>
		2378 <xsd:attribute name="zoomScaleSheetLayoutView" type="xsd:unsignedInt" use="optional"
		2379 default="0"/>
		2380 <xsd:attribute name="zoomScalePageLayoutView" type="xsd:unsignedInt" use="optional"
		2381 default="0"/>
		2382 <xsd:attribute name="workbookViewId" type="xsd:unsignedInt" use="required"/>*/

//x2t
		/*	WritingElement_ReadAttributes_Read_if		( oReader, (L"colorId"),				m_oColorId)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"defaultGridColor"),	m_oDefaultGridColor)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"rightToLeft"),			m_oRightToLeft)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showFormulas"),		m_oShowFormulas)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showGridLines"),		m_oShowGridLines)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showOutlineSymbols"),	m_oShowOutlineSymbols)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showRowColHeaders"),	m_oShowRowColHeaders)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showRuler"),			m_oShowRuler)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showWhiteSpace"),		m_oShowWhiteSpace)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showZeros"),			m_oShowZeros)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"tabSelected"),			m_oTabSelected)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"topLeftCell"),			m_oTopLeftCell)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"view"),				m_oView)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"windowProtection"),	m_oWindowProtection)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"workbookViewId"),		m_oWorkbookViewId)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"zoomScale"),			m_oZoomScale)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"zoomScaleNormal"),		m_oZoomScaleNormal)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"zoomScalePageLayoutView"),		m_oZoomScalePageLayoutView)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"zoomScaleSheetLayoutView"),	m_oZoomScaleSheetLayoutView)		*/

//serialize
		/*his.ReadSheetView = function (type, length, oSheetView) {
					var oThis = this;
					var res = c_oSerConstants.ReadOk;
					if (c_oSer_SheetView.ColorId === type) {
						this.stream.GetLong();
					} else if (c_oSer_SheetView.DefaultGridColor === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.RightToLeft === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowFormulas === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowGridLines === type) {
						oSheetView.showGridLines = this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowOutlineSymbols === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowRowColHeaders === type) {
						oSheetView.showRowColHeaders = this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowRuler === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowWhiteSpace === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.ShowZeros === type) {
						oSheetView.showZeros = this.stream.GetBool();
					} else if (c_oSer_SheetView.TabSelected === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.TopLeftCell === type) {
						var _topLeftCell = AscCommonExcel.g_oRangeCache.getAscRange(this.stream.GetString2LE(length));
						if (_topLeftCell) {
							oSheetView.topLeftCell = new Asc.Range(_topLeftCell.c1, _topLeftCell.r1, _topLeftCell.c1, _topLeftCell.r1);
						}
					} else if (c_oSer_SheetView.View === type) {
						this.stream.GetUChar();
					} else if (c_oSer_SheetView.WindowProtection === type) {
						this.stream.GetBool();
					} else if (c_oSer_SheetView.WorkbookViewId === type) {
						this.stream.GetLong();
					} else if (c_oSer_SheetView.ZoomScale === type) {
						oSheetView.asc_setZoomScale(this.stream.GetLong());
					} else if (c_oSer_SheetView.ZoomScaleNormal === type) {
						this.stream.GetLong();
					} else if (c_oSer_SheetView.ZoomScalePageLayoutView === type) {
						this.stream.GetLong();
					} else if (c_oSer_SheetView.ZoomScaleSheetLayoutView === type) {
						this.stream.GetLong();
					} else if (c_oSer_SheetView.Pane === type) {
						oSheetView.pane = new AscCommonExcel.asc_CPane();
						res = this.bcr.Read1(length, function (t, l) {
							return oThis.ReadPane(t, l, oSheetView.pane);
						});
						oSheetView.pane.init();
					} else if (c_oSer_SheetView.Selection === type) {
						this.curWorksheet.selectionRange.clean();
						res = this.bcr.Read1(length, function (t, l) {
							return oThis.ReadSelection(t, l, oThis.curWorksheet.selectionRange);
						});
						this.curWorksheet.selectionRange.update();
					} else
						res = c_oSerConstants.ReadUnknown;
					return res;
				};*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("colorId" === reader.GetName()) {
				//val = reader.GetValueInt();
				//this.colorId = val;
			} else if ("defaultGridColor" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.defaultGridColor = val;
			} else if ("rightToLeft" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.rightToLeft = val;
			} else if ("showFormulas" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.showFormulas = val;
			} else if ("showGridLines" === reader.GetName()) {
				val = reader.GetValueBool();
				this.showGridLines = val;
			} else if ("showOutlineSymbols" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.showOutlineSymbols = val;
			} else if ("showRowColHeaders" === reader.GetName()) {
				val = reader.GetValueBool();
				this.showRowColHeaders = val;
			} else if ("showRuler" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.showRuler = val;
			} else if ("showWhiteSpace" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.showWhiteSpace = val;
			} else if ("showZeros" === reader.GetName()) {
				val = reader.GetValueBool();
				this.showZeros = val;
			} else if ("tabSelected" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.tabSelected = val;
			} else if ("topLeftCell" === reader.GetName()) {
				var _topLeftCell = AscCommonExcel.g_oRangeCache.getAscRange(reader.GetValue());
				if (_topLeftCell) {
					this.topLeftCell = new Asc.Range(_topLeftCell.c1, _topLeftCell.r1, _topLeftCell.c1, _topLeftCell.r1);
				}
			} else if ("view" === reader.GetName()) {
				//val = reader.GetValue();
				//this.View = val;
			} else if ("windowProtection" === reader.GetName()) {
				//val = reader.GetValueBool();
				//this.WindowProtection = val;
			} else if ("workbookViewId" === reader.GetName()) {
				//val = reader.GetValueInt();
				//this.WorkbookViewId = val;
			} else if ("zoomScale" === reader.GetName()) {
				val = reader.GetValueInt();
				this.ZoomScale = val;
			} else if ("zoomScaleNormal" === reader.GetName()) {
				//val = reader.GetValueInt();
				//this.ZoomScaleNormal = val;
			} else if ("zoomScalePageLayoutView" === reader.GetName()) {
				//val = reader.GetValueInt();
				//this.ZoomScalePageLayoutView = val;
			} else if ("zoomScaleSheetLayoutView" === reader.GetName()) {
				//val = reader.GetValueInt();
				//this.ZoomScaleSheetLayoutView = val;
			}
		}
	};

	AscCommonExcel.asc_CPane.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	AscCommonExcel.asc_CPane.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="xSplit" type="xsd:double" use="optional" default="0"/>
		2386 <xsd:attribute name="ySplit" type="xsd:double" use="optional" default="0"/>
		2387 <xsd:attribute name="topLeftCell" type="ST_CellRef" use="optional"/>
		2388 <xsd:attribute name="activePane" type="ST_Pane" use="optional" default="topLeft"/>
		2389 <xsd:attribute name="state" type="ST_PaneState" use="optional" default="split"/>*/

//x2t
		/*WritingStringNullableAttrString(L"activePane", m_oActivePane, m_oActivePane->ToString());
						WritingStringNullableAttrString(L"state", m_oState, m_oState->ToString());
						WritingStringNullableAttrString(L"topLeftCell", m_oTopLeftCell, m_oTopLeftCell.get());
						WritingStringNullableAttrDouble(L"xSplit", m_oXSplit, m_oXSplit->GetValue());
						WritingStringNullableAttrDouble(L"ySplit", m_oYSplit, m_oYSplit->GetValue());*/

//serialize
		/*  var res = c_oSerConstants.ReadOk;
					if (c_oSer_Pane.ActivePane === type)
						this.stream.GetUChar();
					else if (c_oSer_Pane.State === type)
						oPane.state = this.stream.GetString2LE(length);
					else if (c_oSer_Pane.TopLeftCell === type)
						oPane.topLeftCell = this.stream.GetString2LE(length);
					else if (c_oSer_Pane.XSplit === type)
						oPane.xSplit = this.stream.GetDoubleLE();
					else if (c_oSer_Pane.YSplit === type)
						oPane.ySplit = this.stream.GetDoubleLE();
					else
						res = c_oSerConstants.ReadUnknown;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("activePane" === reader.GetName()) {
				val = reader.GetValue();
				this.activePane = val;
			} else if ("state" === reader.GetName()) {
				val = reader.GetValue();
				this.state = val;
			} else if ("topLeftCell" === reader.GetName()) {
				val = reader.GetValue();
				this.topLeftCell = val;
			} else if ("xSplit" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.xSplit = val;
			}  else if ("ySplit" === reader.GetName()) {
				val = reader.GetValueDouble();
				this.ySplit = val;
			}
		}
	};

	AscCommonExcel.SelectionRange.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	AscCommonExcel.SelectionRange.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="pane" type="ST_Pane" use="optional" default="topLeft"/>
		2415 <xsd:attribute name="activeCell" type="ST_CellRef" use="optional"/>
		2416 <xsd:attribute name="activeCellId" type="xsd:unsignedInt" use="optional" default="0"/>
		2417 <xsd:attribute name="sqref" type="ST_Sqref" use="optional" default="A1"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"activeCell"),	m_oActiveCell)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"activeCellId"),	m_oActiveCellId)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"sqref"),			m_oSqref)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"pane"),			m_oPane)*/

//serialize
		/*var res = c_oSerConstants.ReadOk;
					if (c_oSer_Selection.ActiveCell === type) {
						var activeCell = AscCommonExcel.g_oRangeCache.getAscRange(this.stream.GetString2LE(length));
						if (activeCell) {
							selectionRange.activeCell = new AscCommon.CellBase(activeCell.r1, activeCell.c1);
						}
					} else if (c_oSer_Selection.ActiveCellId === type) {
						selectionRange.activeCellId = this.stream.GetLong();
					} else if (c_oSer_Selection.Sqref === type) {
						var sqRef = this.stream.GetString2LE(length);
						var selectionNew = AscCommonExcel.g_oRangeCache.getRangesFromSqRef(sqRef);
						if (selectionNew.length > 0) {
							selectionRange.ranges = selectionNew;
						}
					} else if (c_oSer_Selection.Pane === type) {
						this.stream.GetUChar();*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("activeCell" === reader.GetName()) {
				var activeCell = AscCommonExcel.g_oRangeCache.getAscRange(reader.GetValue());
				if (activeCell) {
					this.activeCell = new AscCommon.CellBase(activeCell.r1, activeCell.c1);
				}
			} else if ("activeCellId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.activeCellId = val;
			} else if ("sqref" === reader.GetName()) {
				var sqRef = reader.GetValue();
				var selectionNew = AscCommonExcel.g_oRangeCache.getRangesFromSqRef(sqRef);
				if (selectionNew.length > 0) {
					this.ranges = selectionNew;
				}
			} else if ("pane" === reader.GetName()) {
				//val = reader.GetValue();
				//this.pane = val;
			}
		}
	};

	Asc.CProtectedRange.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);

						if (oReader.IsEmptyNode())
							return;

						int nCurDepth = oReader.GetDepth();
						while (oReader.ReadNextSiblingNode(nCurDepth))
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if (L"securityDescriptor" == sName)
								m_arSecurityDescriptors.push_back(oReader.GetText2());
						}
		*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			//TODO проверить
			if ("securityDescriptor" === name) {
				this.securityDescriptor = reader.GetValue();
			}
		}
	};

	Asc.CProtectedRange.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:sequence>
		2942 <xsd:element name="securityDescriptor" type="xsd:string" minOccurs="0"
		2943 maxOccurs="unbounded"/>
		2944 </xsd:sequence>
		2945 <xsd:attribute name="sqref" type="ST_Sqref" use="required"/>
		2946 <xsd:attribute name="name" type="s:ST_Xstring" use="required"/>
		2947 <xsd:attribute name="algorithmName" type="s:ST_Xstring" use="optional"/>
		2948 <xsd:attribute name="hashValue" type="xsd:base64Binary" use="optional"/>
		2949 <xsd:attribute name="saltValue" type="xsd:base64Binary" use="optional"/>
		2950 <xsd:attribute name="spinCount" type="xsd:unsignedInt" use="optional"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if(oReader, (L"algorithmName"), m_oAlgorithmName)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"hashValue"), m_oHashValue)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"saltValue"), m_oSaltValue)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"spinCount"), m_oSpinCount)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"name"), m_oName)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"sqref"), m_oSqref)
							WritingElement_ReadAttributes_Read_else_if(oReader, (L"securityDescriptor"), desc)*/

//serialize
		/*if (c_oSerProtectedRangeTypes.AlgorithmName === type) {
						oProtectedRange.algorithmName = this.stream.GetUChar();
					} else if (c_oSerProtectedRangeTypes.SpinCount === type) {
						oProtectedRange.spinCount = this.stream.GetLong();
					} else if (c_oSerProtectedRangeTypes.HashValue === type) {
						oProtectedRange.hashValue = this.stream.GetString2LE(length);
					} else if (c_oSerProtectedRangeTypes.SaltValue === type) {
						oProtectedRange.saltValue = this.stream.GetString2LE(length);
					} else if (c_oSerProtectedRangeTypes.Name === type) {
						oProtectedRange.name = this.stream.GetString2LE(length);
					} else if (c_oSerProtectedRangeTypes.SqRef === type) {
						var sqRef = this.stream.GetString2LE(length);
						var newSqRef = AscCommonExcel.g_oRangeCache.getRangesFromSqRef(sqRef);
						if (newSqRef.length > 0) {
							oProtectedRange.sqref = newSqRef;
						}
					} else if (c_oSerProtectedRangeTypes.SecurityDescriptor === type) {
						oProtectedRange.securityDescriptor = this.stream.GetString2LE(length);
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("algorithmName" === reader.GetName()) {
				val = reader.GetValue();
				this.algorithmName = AscCommonExcel.getAlgorithmNameFromXml(val);
			} else if ("hashValue" === reader.GetName()) {
				val = reader.GetValue();
				this.hashValue = val;
			} else if ("saltValue" === reader.GetName()) {
				val = reader.GetValue();
				this.saltValue = val;
			} else if ("spinCount" === reader.GetName()) {
				val = reader.GetValueInt();
				this.spinCount = val;
			} else if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.name = val;
			} else if ("sqref" === reader.GetName()) {
				var sqRef = reader.GetValue();
				var newSqRef = AscCommonExcel.g_oRangeCache.getRangesFromSqRef(sqRef);
				if (newSqRef.length > 0) {
					this.sqref = newSqRef;
				}
			} /*else if ("securityDescriptor" === reader.GetName()) {
				val = reader.GetValue();
				this.securityDescriptor = val;
			}*/
		}
	};

	Asc.CHeaderFooter.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( (L"evenFooter") == sName )
								m_oEvenFooter = oReader;
							else if ( (L"evenHeader") == sName )
								m_oEvenHeader = oReader;
							else if ( (L"firstFooter") == sName )
								m_oFirstFooter = oReader;
							else if ( (L"firstHeader") == sName )
								m_oFirstHeader = oReader;
							else if ( (L"oddFooter") == sName )
								m_oOddFooter = oReader;
							else if ( (L"oddHeader") == sName )
								m_oOddHeader = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		var val;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("evenFooter" === name) {
				val = reader.GetText();
				if(val) {
					this.setEvenFooter(val);
				}
			} else if ("evenHeader" === name) {
				val = reader.GetText();
				if(val) {
					this.setEvenHeader(val);
				}
			} else if ("firstFooter" === name) {
				val = reader.GetText();
				if(val) {
					this.setFirstFooter(val);
				}
			} else if ("firstHeader" === name) {
				val = reader.GetText();
				if(val) {
					this.setFirstHeader(val);
				}
			} else if ("oddFooter" === name) {
				val = reader.GetText();
				if(val) {
					this.setOddFooter(val);
				}
			} else if ("oddHeader" === name) {
				val = reader.GetText();
				if(val) {
					this.setOddHeader(val);
				}
			}
		}
	};

	Asc.CHeaderFooter.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:sequence>
		2884 <xsd:element name="oddHeader" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
		2885 <xsd:element name="oddFooter" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
		2886 <xsd:element name="evenHeader" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
		2887 <xsd:element name="evenFooter" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
		2888 <xsd:element name="firstHeader" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
		2889 <xsd:element name="firstFooter" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
		2890 </xsd:sequence>
		2891 <xsd:attribute name="differentOddEven" type="xsd:boolean" default="false"/>
		2892 <xsd:attribute name="differentFirst" type="xsd:boolean" default="false"/>
		2893 <xsd:attribute name="scaleWithDoc" type="xsd:boolean" default="true"/>
		2894 <xsd:attribute name="alignWithMargins" type="xsd:boolean" default="true"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"alignWithMargins"),	m_oAlignWithMargins)
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"differentFirst"),	m_oDifferentFirst)
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"differentOddEven"),	m_oDifferentOddEven)
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"scaleWithDoc"),		m_oScaleWithDoc)*/

//serialize
		/* if (c_oSer_HeaderFooter.AlignWithMargins === type) {
						headerFooter.setAlignWithMargins(this.stream.GetBool());
					} else if (c_oSer_HeaderFooter.DifferentFirst === type) {
						headerFooter.setDifferentFirst(this.stream.GetBool());
					} else if (c_oSer_HeaderFooter.DifferentOddEven === type) {
						headerFooter.setDifferentOddEven(this.stream.GetBool());
					} else if (c_oSer_HeaderFooter.ScaleWithDoc === type) {
						headerFooter.setScaleWithDoc(this.stream.GetBool());
					} else if (c_oSer_HeaderFooter.EvenFooter === type) {
						sVal = this.stream.GetString2LE(length);
						if(sVal) {
							headerFooter.setEvenFooter(sVal);
						}
					} else if (c_oSer_HeaderFooter.EvenHeader === type) {
						sVal = this.stream.GetString2LE(length);
						if(sVal) {
							headerFooter.setEvenHeader(sVal);
						}
					} else if (c_oSer_HeaderFooter.FirstFooter === type) {
						sVal = this.stream.GetString2LE(length);
						if(sVal) {
							headerFooter.setFirstFooter(sVal);
						}
					} else if (c_oSer_HeaderFooter.FirstHeader === type) {
						sVal = this.stream.GetString2LE(length);
						if(sVal) {
							headerFooter.setFirstHeader(sVal);
						}
					} else if (c_oSer_HeaderFooter.OddFooter === type) {
						sVal = this.stream.GetString2LE(length);
						if(sVal) {
							headerFooter.setOddFooter(sVal);
						}
					} else if (c_oSer_HeaderFooter.OddHeader === type) {
						sVal = this.stream.GetString2LE(length);
						if(sVal) {
							headerFooter.setOddHeader(sVal);
						}
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("alignWithMargins" === reader.GetName()) {
				val = reader.GetValueBool();
				this.setAlignWithMargins(val);
			} else if ("differentFirst" === reader.GetName()) {
				val = reader.GetValueBool();
				this.setDifferentFirst(val);
			} else if ("differentOddEven" === reader.GetName()) {
				val = reader.GetValueBool();
				this.setDifferentOddEven(val);
			} else if ("scaleWithDoc" === reader.GetName()) {
				val = reader.GetValueBool();
				this.setScaleWithDoc(val);
			}
		}
	};

	Asc.CSheetProtection.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.CSheetProtection.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="algorithmName" type="s:ST_Xstring" use="optional"/>
		2914 <xsd:attribute name="hashValue" type="xsd:base64Binary" use="optional"/>
		2915 <xsd:attribute name="saltValue" type="xsd:base64Binary" use="optional"/>
		2916 <xsd:attribute name="spinCount" type="xsd:unsignedInt" use="optional"/>
		2917 <xsd:attribute name="sheet" type="xsd:boolean" use="optional" default="false"/>
		2918 <xsd:attribute name="objects" type="xsd:boolean" use="optional" default="false"/>
		2919 <xsd:attribute name="scenarios" type="xsd:boolean" use="optional" default="false"/>
		2920 <xsd:attribute name="formatCells" type="xsd:boolean" use="optional" default="true"/>
		2921 <xsd:attribute name="formatColumns" type="xsd:boolean" use="optional" default="true"/>
		2922 <xsd:attribute name="formatRows" type="xsd:boolean" use="optional" default="true"/>
		2923 <xsd:attribute name="insertColumns" type="xsd:boolean" use="optional" default="true"/>
		2924 <xsd:attribute name="insertRows" type="xsd:boolean" use="optional" default="true"/>
		2925 <xsd:attribute name="insertHyperlinks" type="xsd:boolean" use="optional" default="true"/>
		2926 <xsd:attribute name="deleteColumns" type="xsd:boolean" use="optional" default="true"/>
		2927 <xsd:attribute name="deleteRows" type="xsd:boolean" use="optional" default="true"/>
		2928 <xsd:attribute name="selectLockedCells" type="xsd:boolean" use="optional" default="false"/>
		2929 <xsd:attribute name="sort" type="xsd:boolean" use="optional" default="true"/>
		2930 <xsd:attribute name="autoFilter" type="xsd:boolean" use="optional" default="true"/>
		2931 <xsd:attribute name="pivotTables" type="xsd:boolean" use="optional" default="true"/>
		2932 <xsd:attribute name="selectUnlockedCells" type="xsd:boolean" use="optional" default="false"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"password"),		m_oPassword)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"algorithmName"),	m_oAlgorithmName)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"hashValue"),		m_oHashValue)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"saltValue"),		m_oSaltValue)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"spinCount"),		m_oSpinCount)

							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"autoFilter"),	m_oAutoFilter)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"content"),		m_oContent)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"deleteColumns"),	m_oDeleteColumns)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"deleteRows"),	m_oDeleteRows)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"formatCells"),	m_oFormatCells)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"formatColumns"),	m_oFormatColumns)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"formatRows"),	m_oFormatRows)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"insertColumns"),	m_oInsertColumns)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"insertHyperlinks"),m_oInsertHyperlinks)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"insertRows"),	m_oInsertRows)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"objects"),		m_oObjects)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"pivotTables"),	m_oPivotTables)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"scenarios"),		m_oScenarios)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"selectLockedCells"),m_oSelectLockedCells)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"selectUnlockedCells"),m_oSelectUnlockedCells)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"sheet"),			m_oSheet)
							WritingElement_ReadAttributes_Read_else_if	( oReader, (L"sort"),			m_oSort)*/

//serialize
		/* if (c_oSerWorksheetProtection.AlgorithmName == type) {
						sheetProtection.algorithmName = this.stream.GetUChar();
					} else if (c_oSerWorksheetProtection.SpinCount == type) {
						sheetProtection.spinCount = this.stream.GetLong();
					} else if (c_oSerWorksheetProtection.HashValue == type) {
						sheetProtection.hashValue = this.stream.GetString2LE(length);
					} else if (c_oSerWorksheetProtection.SaltValue == type) {
						sheetProtection.saltValue = this.stream.GetString2LE(length);
					} else if (c_oSerWorksheetProtection.Password == type) {
						sheetProtection.password = this.stream.GetString2LE(length);
					} else if (c_oSerWorksheetProtection.AutoFilter == type) {
						sheetProtection.autoFilter = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.Content == type) {
						sheetProtection.content = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.DeleteColumns == type) {
						sheetProtection.deleteColumns = this.stream.GetBool(length);
					} else if (c_oSerWorksheetProtection.DeleteRows == type) {
						sheetProtection.deleteRows = this.stream.GetBool(length);
					} else if (c_oSerWorksheetProtection.FormatCells == type) {
						sheetProtection.formatCells = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.FormatColumns == type) {
						sheetProtection.formatColumns = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.FormatRows == type) {
						sheetProtection.formatRows = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.InsertColumns == type) {
						sheetProtection.insertColumns = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.InsertHyperlinks == type) {
						sheetProtection.insertHyperlinks = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.InsertRows == type) {
						sheetProtection.insertRows = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.Objects == type) {
						sheetProtection.objects = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.PivotTables == type) {
						sheetProtection.pivotTables = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.Scenarios == type) {
						sheetProtection.scenarios = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.SelectLockedCells == type) {
						sheetProtection.selectLockedCells = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.SelectUnlockedCell == type) {
						sheetProtection.selectUnlockedCell = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.Sheet == type) {
						sheetProtection.sheet = this.stream.GetBool();
					} else if (c_oSerWorksheetProtection.Sort == type) {
						sheetProtection.sort = this.stream.GetBool();*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("password" === reader.GetName()) {
				val = reader.GetValue();
				this.password = val;
			} else if ("algorithmName" === reader.GetName()) {
				val = reader.GetValue();
				this.algorithmName = AscCommonExcel.getAlgorithmNameFromXml(val);
			} else if ("hashValue" === reader.GetName()) {
				val = reader.GetValue();
				this.hashValue = val;
			} else if ("saltValue" === reader.GetName()) {
				val = reader.GetValue();
				this.saltValue = val;
			} else if ("spinCount" === reader.GetName()) {
				val = reader.GetValueInt();
				this.spinCount = val;
			} else if ("autoFilter" === reader.GetName()) {
				val = reader.GetValueBool();
				this.autoFilter = val;
			} else if ("content" === reader.GetName()) {
				val = reader.GetValueBool();
				this.content = val;
			} else if ("deleteColumns" === reader.GetName()) {
				val = reader.GetValueBool();
				this.deleteColumns = val;
			} else if ("deleteRows" === reader.GetName()) {
				val = reader.GetValueBool();
				this.deleteRows = val;
			} else if ("formatCells" === reader.GetName()) {
				val = reader.GetValueBool();
				this.formatCells = val;
			} else if ("formatColumns" === reader.GetName()) {
				val = reader.GetValueBool();
				this.formatColumns = val;
			} else if ("formatRows" === reader.GetName()) {
				val = reader.GetValueBool();
				this.formatRows = val;
			} else if ("insertColumns" === reader.GetName()) {
				val = reader.GetValueBool();
				this.insertColumns = val;
			} else if ("insertHyperlinks" === reader.GetName()) {
				val = reader.GetValueBool();
				this.insertHyperlinks = val;
			} else if ("insertRows" === reader.GetName()) {
				val = reader.GetValueBool();
				this.insertRows = val;
			} else if ("objects" === reader.GetName()) {
				val = reader.GetValueBool();
				this.objects = val;
			} else if ("pivotTables" === reader.GetName()) {
				val = reader.GetValueBool();
				this.pivotTables = val;
			} else if ("scenarios" === reader.GetName()) {
				val = reader.GetValueBool();
				this.scenarios = val;
			} else if ("selectLockedCells" === reader.GetName()) {
				val = reader.GetValueBool();
				this.selectLockedCells = val;
			} else if ("selectUnlockedCells" === reader.GetName()) {
				val = reader.GetValueBool();
				this.selectUnlockedCells = val;
			} else if ("sheet" === reader.GetName()) {
				val = reader.GetValueBool();
				this.sheet = val;
			} else if ("sort" === reader.GetName()) {
				val = reader.GetValueBool();
				this.sort = val;
			}
		}
	};


	function COfficeArtExtensionList () {
		this.arrExt = [];
	}

	COfficeArtExtensionList.prototype.fromXml = function (reader) {
		if (reader.IsEmptyNode()) {
			return;
		}

		/*virtual void fromXML(XmlUtils::CXmlLiteReader& oReader)
		{
			if ( oReader.IsEmptyNode() )
				return;

			int nCurDepth = oReader.GetDepth();
			while( oReader.ReadNextSiblingNode( nCurDepth ) )
			{
				std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
				if ( _T("ext") == sName )
				{
					OOX::Drawing::COfficeArtExtension *oExt = new OOX::Drawing::COfficeArtExtension(oReader);
					if (oExt) m_arrExt.push_back( oExt );
				}
			}
		}*/

		//TODO обработать ext!
		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("ext" === name) {
				val = new COfficeArtExtension();
				val.fromXml(reader);
				this.arrExt.push(val);
			}
		}
	};


	AscCommonExcel.CDataValidation.prototype.toXml = function(writer, bExtendedWrite) {
		/*void CDataValidation::toXML2(NSStringUtils::CStringBuilder& writer, bool bExtendedWrite) const
		{
			std::wstring node_name = bExtendedWrite ? L"x14:dataValidation" : L"dataValidation";

			writer.WriteString(L"<" + node_name);
			if (bExtendedWrite)
			{
				if (false == m_oUuid.IsInit())
				{
					m_oUuid = L"{" + XmlUtils::GenerateGuid() + L"}";
				}
				WritingStringNullableAttrString	(L"xr:uid",	m_oUuid, m_oUuid.get());
			}
			else
			{
				WritingStringNullableAttrString(L"sqref", m_oSqRef, m_oSqRef.get());
			}
			WritingStringNullableAttrString				(L"type",			m_oType,			m_oType->ToString());
			WritingStringNullableAttrInt				(L"allowBlank",		m_oAllowBlank,		m_oAllowBlank->GetValue());
			WritingStringNullableAttrEncodeXmlStringHHHH(L"error",			m_oError,			m_oError.get());
			WritingStringNullableAttrString				(L"errorStyle",		m_oErrorStyle,		m_oErrorStyle->ToString());
			WritingStringNullableAttrEncodeXmlStringHHHH(L"errorTitle",		m_oErrorTitle,		m_oErrorTitle.get());
			WritingStringNullableAttrString				(L"imeMode",		m_oImeMode,			m_oImeMode->ToString());
			WritingStringNullableAttrString				(L"operator",		m_oOperator,		m_oOperator->ToString());
			WritingStringNullableAttrEncodeXmlStringHHHH(L"prompt",			m_oPrompt,			m_oPrompt.get());
			WritingStringNullableAttrEncodeXmlStringHHHH(L"promptTitle",	m_oPromptTitle,		m_oPromptTitle.get());
			WritingStringNullableAttrInt				(L"showDropDown",	m_oShowDropDown,	m_oShowDropDown->GetValue());
			WritingStringNullableAttrInt				(L"showErrorMessage",m_oShowErrorMessage,m_oShowErrorMessage->GetValue());
			WritingStringNullableAttrInt				(L"showInputMessage",m_oShowInputMessage,m_oShowInputMessage->GetValue());
			writer.WriteString(L">");

			if (bExtendedWrite)
			{
				if (m_oFormula1.IsInit())
				{
					writer.WriteString(L"<x14:formula1>");
					m_oFormula1->toXML2(writer, true);
					writer.WriteString(L"</x14:formula1>");
				}
				if (m_oFormula2.IsInit())
				{
					writer.WriteString(L"<x14:formula2>");
					m_oFormula2->toXML2(writer, true);
					writer.WriteString(L"</x14:formula2>");
				}
				if (m_oSqRef.IsInit())
				{
					writer.WriteString(L"<xm:sqref>" + m_oSqRef.get() + L"</xm:sqref>");
				}
			}
			else
			{
				if (m_oFormula1.IsInit())
				{
					writer.WriteString(L"<formula1>");
					writer.WriteString(m_oFormula1->m_sText);
					writer.WriteString(L"</formula1>");
				}
				if (m_oFormula2.IsInit())
				{
					writer.WriteString(L"<formula2>");
					writer.WriteString(m_oFormula2->m_sText);
					writer.WriteString(L"</formula2>");
				}
			}
			writer.WriteString(L"</" + node_name + L">");
		}*/


		var node_name = bExtendedWrite ? "x14:dataValidation" : "dataValidation";

		writer.WriteXmlString("<" + node_name);
		if (bExtendedWrite)
		{
			/*if (false == m_oUuid.IsInit())
			{
				m_oUuid = L"{" + XmlUtils::GenerateGuid() + L"}";
			}
			WritingStringNullableAttrString	(L"xr:uid",	m_oUuid, m_oUuid.get());*/
		}
		else
		{
			writer.WriteXmlNullableAttributeNumber("sqref", AscCommonExcel.getSqRefString(this.ranges));
		}

		writer.WriteXmlNullableAttributeString("type", this.type);
		writer.WriteXmlNullableAttributeNumber("allowBlank", this.allowBlank);

		//todo WritingStringNullableAttrEncodeXmlStringHHHH
		writer.WriteXmlNullableAttributeStringEncode("error", this.error);

		writer.WriteXmlNullableAttributeString("errorStyle", this.errorStyle);

		//todo WritingStringNullableAttrEncodeXmlStringHHHH
		writer.WriteXmlNullableAttributeStringEncode("errorTitle", this.errorTitle);

		writer.WriteXmlNullableAttributeString("imeMode", this.imeMode);
		writer.WriteXmlNullableAttributeString("operator", this.operator);

		//todo WritingStringNullableAttrEncodeXmlStringHHHH
		writer.WriteXmlNullableAttributeStringEncode("prompt", this.prompt);
		writer.WriteXmlNullableAttributeStringEncode("promptTitle", this.promptTitle);

		writer.WriteXmlNullableAttributeNumber("showDropDown", this.showDropDown);
		writer.WriteXmlNullableAttributeNumber("showErrorMessage", this.showErrorMessage);
		writer.WriteXmlNullableAttributeNumber("showInputMessage", this.showInputMessage);

		writer.WriteXmlAttributesEnd();


		if (bExtendedWrite) {
			var node_formula_name = bExtendedWrite ? "xm:f" : "formula";
			if (this.formula1) {
				writer.WriteXmlString("<x14:formula1>");

				writer.WriteXmlString("<" + node_formula_name + ">");
				writer.WriteXmlStringEncode(this.formula1.text);
				writer.WriteXmlString("</" + node_formula_name + ">");

				writer.WriteXmlString("</x14:formula2>");
			}
			if (this.formula2) {
				writer.WriteXmlString("<x14:formula2>");

				writer.WriteXmlString("<" + node_formula_name + ">");
				writer.WriteXmlStringEncode(this.formula2.text);
				writer.WriteXmlString("</" + node_formula_name + ">");

				writer.WriteXmlString("</x14:formula2>");
			}
			if (this.ranges) {
				writer.WriteXmlString("<xm:sqref>" + AscCommonExcel.getSqRefString(this.ranges) + "</xm:sqref>");
			}
		} else {
			if (this.formula1) {
				writer.WriteXmlString("<formula1>");
				writer.WriteXmlString(this.formula1.text);
				writer.WriteXmlString("</formula1>");
			}
			if (this.formula2) {
				writer.WriteXmlString("<formula2>");
				writer.WriteXmlString(this.formula2.text);
				writer.WriteXmlString("</formula2>");
			}
		}
		writer.WriteXmlString("</" + node_name + ">");
	};

	function COfficeArtExtension() {
		this.uri = null;
		this.dataValidations = [];
		this.slicerCachesIds = [];
		this.tableSlicerCaches = [];
	}

	COfficeArtExtension.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		if (this.uri === "{63B3BB69-23CF-44E3-9099-C40C66FF867C}" || this.uri === "{05C60535-1F16-4fd2-B633-F4F36F0B64E0}" || this.uri ===
			"{504A1905-F514-4f6f-8877-14C23A59335A}" || this.uri === "{78C0D931-6437-407d-A8EE-F0AAD7539E65}" || this.uri === "{B025F937-C7B1-47D3-B67F-A62EFF666E3E}" ||
			this.uri === "{CCE6A557-97BC-4b89-ADB6-D9C93CAAB3DF}" || this.uri === "{A8765BA9-456A-4dab-B4F3-ACF838C121DE}" || this.uri ===
			"{3A4CF648-6AED-40f4-86FF-DC5316D8AED3}" || this.uri === "{BBE1A952-AA13-448e-AADC-164F8A28A991}" || this.uri === "{46BE6895-7355-4a93-B00E-2C351335B9C9}" ||
			this.uri === "{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" || this.uri === "{03082B11-2C62-411c-B77F-237D8FCFBE4C}" || this.uri ===
			"{2F2917AC-EB37-4324-AD4E-5DD8C200BD13}" || this.uri === "{470722E0-AACD-4C17-9CDC-17EF765DBC7E}" || this.uri === "{46F421CA-312F-682f-3DD2-61675219B42D}" ||
			this.uri === "{DE250136-89BD-433C-8126-D09CA5730AF9}" || this.uri === "{19B8F6BF-5375-455C-9EA6-DF929625EA0E}" || this.uri ===
			"http://schemas.microsoft.com/office/drawing/2008/diagram") {
			var val;
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("compatExt" === name) {
					/*val = new AscCommonExcel.CDataValidation();
					val.fromXml(reader);
					this.elems.push(val);*/
				} else if ("compatExt" === name) {

				} else if ("sparklineGroups" === name) {

				} else if ("dataModelExt" === name) {

				} else if ("table" === name) {

				} else if ("conditionalFormattings" === name) {

				} else if ("dataValidations" === name) {
					val = new AscCommonExcel.CDataValidations();
					val.fromXml(reader);
					this.dataValidations.push(val);
				} else if ("connection" === name) {

				} else if ("slicerList" === name) {

				} else if ("slicerCaches" === name) {
					var depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						var name2 = reader.GetNameNoNS();
						if ("slicerCache" === name2) {

							while (reader.MoveToNextAttribute()) {
								if ("id" === reader.GetNameNoNS()) {
									this.slicerCachesIds.push(reader.GetValue());
								}
							}
						}
					}
				} else if ("dxfs" === name) {

				} else if ("slicerStyles" === name) {

				} else if ("slicerCachePivotTables" === name) {

				} else if ("tableSlicerCache" === name) {
					val = new Asc.CT_tableSlicerCache();
					val.fromXml(reader);
					this.tableSlicerCaches.push(val);
				} else if ("slicerCacheHideItemsWithNoData" === name) {

				} else if ("id" === name) {

				} else if ("presenceInfo" === name) {

				}
			}
		} else {
			if (!reader.IsEmptyNode()) {
				reader.ReadTillEnd();
			}
		}


		/*if ((m_sUri.IsInit()) && (*m_sUri == L"{63B3BB69-23CF-44E3-9099-C40C66FF867C}"	||
		*m_sUri == L"{05C60535-1F16-4fd2-B633-F4F36F0B64E0}"	||
	*m_sUri == L"{504A1905-F514-4f6f-8877-14C23A59335A}"	||
	*m_sUri == L"{78C0D931-6437-407d-A8EE-F0AAD7539E65}"	||
	*m_sUri == L"{B025F937-C7B1-47D3-B67F-A62EFF666E3E}"	||
	*m_sUri == L"{CCE6A557-97BC-4b89-ADB6-D9C93CAAB3DF}"	||
	*m_sUri == L"{A8765BA9-456A-4dab-B4F3-ACF838C121DE}"	||
	*m_sUri == L"{3A4CF648-6AED-40f4-86FF-DC5316D8AED3}"	||
	*m_sUri == L"{BBE1A952-AA13-448e-AADC-164F8A28A991}"	||
	*m_sUri == L"{46BE6895-7355-4a93-B00E-2C351335B9C9}"	||
	*m_sUri == L"{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}"	||
	*m_sUri == L"{03082B11-2C62-411c-B77F-237D8FCFBE4C}"	||
	*m_sUri == L"{2F2917AC-EB37-4324-AD4E-5DD8C200BD13}"	||
	*m_sUri == L"{470722E0-AACD-4C17-9CDC-17EF765DBC7E}"	||
	*m_sUri == L"{46F421CA-312F-682f-3DD2-61675219B42D}"	||
	*m_sUri == L"{DE250136-89BD-433C-8126-D09CA5730AF9}"	||
	*m_sUri == L"{19B8F6BF-5375-455C-9EA6-DF929625EA0E}"	||
	*m_sUri == L"http://schemas.microsoft.com/office/drawing/2008/diagram"))
		{
			int nCurDepth = oReader.GetDepth();
			while( oReader.ReadNextSiblingNode( nCurDepth ) )
			{
				std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
				if (sName == L"compatExt")//2.3.1.2 compatExt
				{	//attributes spid -https://msdn.microsoft.com/en-us/library/hh657207(v=office.12).aspx
					m_oCompatExt = oReader;
				}
			else if (sName == L"sparklineGroups")
				{
					m_oSparklineGroups = oReader;
				}
			else if (sName == L"dataModelExt")
				{
					m_oDataModelExt = oReader;
				}
			else if (sName == L"table")
				{
					m_oAltTextTable = oReader;
				}
			else if (sName == L"conditionalFormattings")
				{
					if ( oReader.IsEmptyNode() )
						continue;

					int nCurDepth1 = oReader.GetDepth();
					while( oReader.ReadNextSiblingNode( nCurDepth1 ) )
					{
						m_arrConditionalFormatting.push_back(new OOX::Spreadsheet::CConditionalFormatting(oReader));
					}
				}
			else if (sName == L"dataValidations")
				{
					m_oDataValidations = oReader;
				}
			else if (sName == L"connection")
				{
					m_oConnection = oReader;
				}
			else if (sName == L"slicerList")
				{
					if (L"{A8765BA9-456A-4dab-B4F3-ACF838C121DE}" == *m_sUri)
					{
						m_oSlicerList = oReader;
					}
				else
					{
						m_oSlicerListExt = oReader;
					}
				}
			else if (sName == L"slicerCaches")
				{
					if (L"{BBE1A952-AA13-448e-AADC-164F8A28A991}" == *m_sUri)
					{
						m_oSlicerCaches = oReader;
					}
				else
					{
						m_oSlicerCachesExt = oReader;
					}
				}
			else if (sName == L"dxfs")
				{
					m_oDxfs = oReader;
				}
			else if (sName == L"slicerStyles")
				{
					m_oSlicerStyles = oReader;
				}
			else if (sName == L"slicerCachePivotTables")
				{
					if ( oReader.IsEmptyNode() )
						continue;

					int nCurDepth1 = oReader.GetDepth();
					while( oReader.ReadNextSiblingNode( nCurDepth1 ) )
					{
						m_oSlicerCachePivotTables.push_back(new OOX::Spreadsheet::CSlicerCachePivotTable(oReader));
					}
				}
			else if (sName == L"tableSlicerCache")
				{
					m_oTableSlicerCache = oReader;
				}
			else if (sName == L"slicerCacheHideItemsWithNoData")
				{
					m_oSlicerCacheHideItemsWithNoData = oReader;
				}
			else if (sName == L"id")
				{
					m_oId = oReader.GetText2();
				}
			else if (sName == L"presenceInfo")
				{
					m_oPresenceInfo = oReader;
				}
			}
		}
	else
		{
			if ( !oReader.IsEmptyNode() )
				oReader.ReadTillEnd();
		}
	}*/
	};

	COfficeArtExtension.prototype.readAttr = function (reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("uri" === reader.GetName()) {
				val = reader.GetValue();
				this.uri = val;
			}
		}
	}

	AscCommonExcel.CConditionalFormatting.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("cfRule" === name) {
				//var ext = {isExt: false};
				val = new AscCommonExcel.CConditionalFormattingRule();
				val.fromXml(reader);
				this.aRules.push(val);
			} else if ("sqref" === name || "Range" === name) {
				//TODO
				val = reader.GetValue();
				this.setSqRef(val);
			}
		}

		/*ReadAttributes(oReader);

		if (oReader.IsEmptyNode())
			return;

		int nCurDepth = oReader.GetDepth();
		while (oReader.ReadNextSiblingNode(nCurDepth))
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

			if (L"cfRule" == sName)
			m_arrItems.push_back(new CConditionalFormattingRule(oReader));
			if (L"sqref" == sName || L"Range" == sName)
			m_oSqRef = oReader.GetText2();
		}*/

	};

	AscCommonExcel.CConditionalFormatting.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:sequence>
			2736 <xsd:element name="cfRule" type="CT_CfRule" minOccurs="1" maxOccurs="unbounded"/>
			2737 <xsd:element name="extLst" minOccurs="0" type="CT_ExtensionList"/>
			2738 </xsd:sequence>
			2739 <xsd:attribute name="pivot" type="xsd:boolean" default="false"/>
			2740 <xsd:attribute name="sqref" type="ST_Sqref"/>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if		(oReader, L"sqref"	, m_oSqRef)
		WritingElement_ReadAttributes_Read_else_if	(oReader, L"pivot"	, m_oPivot)*/

		//serialize
		/*   var oConditionalFormattingRule = null;
            if (c_oSer_ConditionalFormatting.Pivot === type)
                oConditionalFormatting.pivot = this.stream.GetBool();
            else if (c_oSer_ConditionalFormatting.SqRef === type) {
                oConditionalFormatting.setSqRef(this.stream.GetString2LE(length));
            }
            else if (c_oSer_ConditionalFormatting.ConditionalFormattingRule === type) {
                oConditionalFormattingRule = new AscCommonExcel.CConditionalFormattingRule();
                var ext = {isExt: false};
                res = this.bcr.Read1(length, function (t, l) {
                    return oThis.ReadConditionalFormattingRule(t, l, oConditionalFormattingRule, ext);
                });
                oConditionalFormatting.aRules.push(oConditionalFormattingRule);
            }*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("sqref" === reader.GetName()) {
				val = reader.GetValue();
				this.setSqRef(val);
			} else if ("pivot" === reader.GetName()) {
				val = reader.GetValueBool();
				this.pivot = val;
			}
		}
	};

	AscCommonExcel.CConditionalFormatting.prototype.toXml = function (writer, bExtendedWrite) {

		/*std::wstring node_name = bExtendedWrite ? L"x14:conditionalFormatting" : L"conditionalFormatting";

			writer.WriteString(L"<" + node_name);
				if (bExtendedWrite)
				{
					WritingStringAttrString(L"xmlns:xm", L"http://schemas.microsoft.com/office/excel/2006/main");
				}
				else
				{
					WritingStringAttrString(L"sqref", m_oSqRef.get());
				}
				if (m_oPivot.IsInit() && true == m_oPivot->ToBool())
				{
					writer.WriteString(L" pivot=\"1\"");
				}
			writer.WriteString(L">");

			for ( size_t i = 0; i < m_arrItems.size(); ++i)
			{
				if (  m_arrItems[i] )
				{
					m_arrItems[i]->toXML2(writer, bExtendedWrite);
				}
			}
			if (bExtendedWrite)
			{
				writer.WriteString(L"<xm:sqref>" + m_oSqRef.get() + L"</xm:sqref>");
			}
			writer.WriteString(L"</" + node_name + L">");*/

		var node_name = bExtendedWrite ? "x14:conditionalFormatting" : "conditionalFormatting";

		writer.WriteXmlString("<" + node_name);
		if (bExtendedWrite) {
			//TODO
			//writer.WriteXmlAttributeString("xmlns:xm", this.xmlns:xm);
		} else {
			writer.WriteXmlAttributeString("sqref", AscCommonExcel.getSqRefString(this.ranges));
		}
		if (this.pivot) {
			writer.WriteXmlString(" pivot=\"1\"");
		}
		writer.WriteXmlString(">");

		for (var i = 0; i < this.aRules.length; ++i) {
			if (this.aRules[i]) {
				this.aRules[i].toXML(writer, bExtendedWrite);
			}
		}
		if (bExtendedWrite) {
			writer.WriteXmlString("<xm:sqref>" + AscCommonExcel.getSqRefString(this.ranges) + "</xm:sqref>");
		}
		writer.WriteXmlString("</" + node_name + ">");
	};

	AscCommonExcel.CConditionalFormattingRule.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("colorScale" === name) {
				val = new AscCommonExcel.CColorScale();
				val.fromXml(reader);
				this.aRuleElements.push(val);
			} else if ("dataBar" === name ) {
				val = new AscCommonExcel.CDataBar();
				val.fromXml(reader);
				this.aRuleElements.push(val);
			} else if ("formula" === name || "f" === name) {
				val = new AscCommonExcel.CFormulaCF()
				val.text = reader.GetValue();
				this.aRuleElements.push(val);
			} else if ("iconSet" === name) {
				val = new AscCommonExcel.CIconSet();
				val.fromXml(reader);
				this.aRuleElements.push(val);
			} else if ("dxf" === name ) {
				//TODO
				val = reader.GetValue();
				if (this.setSqRef) {
					this.setSqRef(val);
				}
			} else if ("extLst" === name ) {
				//TODO
				val = reader.GetValue();
				if (this.setSqRef) {
					this.setSqRef(val);
				}
			}
		}

	};

	AscCommonExcel.CConditionalFormattingRule.prototype.readAttr = function(reader) {
		//documentation
		/*<xsd:complexType name="CT_CfRule">
			2743 <xsd:sequence>
			2744 <xsd:element name="formula" type="ST_Formula" minOccurs="0" maxOccurs="3"/>
			2745 <xsd:element name="colorScale" type="CT_ColorScale" minOccurs="0" maxOccurs="1"/>ECMA-376 Part 1
			4460
			2746 <xsd:element name="dataBar" type="CT_DataBar" minOccurs="0" maxOccurs="1"/>
			2747 <xsd:element name="iconSet" type="CT_IconSet" minOccurs="0" maxOccurs="1"/>
			2748 <xsd:element name="extLst" minOccurs="0" type="CT_ExtensionList"/>
			2749 </xsd:sequence>
			2750 <xsd:attribute name="type" type="ST_CfType"/>
			2751 <xsd:attribute name="dxfId" type="ST_DxfId" use="optional"/>
			2752 <xsd:attribute name="priority" type="xsd:int" use="required"/>
			2753 <xsd:attribute name="stopIfTrue" type="xsd:boolean" use="optional" default="false"/>
			2754 <xsd:attribute name="aboveAverage" type="xsd:boolean" use="optional" default="true"/>
			2755 <xsd:attribute name="percent" type="xsd:boolean" use="optional" default="false"/>
			2756 <xsd:attribute name="bottom" type="xsd:boolean" use="optional" default="false"/>
			2757 <xsd:attribute name="operator" type="ST_ConditionalFormattingOperator" use="optional"/>
			2758 <xsd:attribute name="text" type="xsd:string" use="optional"/>
			2759 <xsd:attribute name="timePeriod" type="ST_TimePeriod" use="optional"/>
			2760 <xsd:attribute name="rank" type="xsd:unsignedInt" use="optional"/>
			2761 <xsd:attribute name="stdDev" type="xsd:int" use="optional"/>
			2762 <xsd:attribute name="equalAverage" type="xsd:boolean" use="optional" default="false"/>
			2763 </xsd:complexType>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if		(oReader, L"aboveAverage"	, m_oAboveAverage)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"bottom"			, m_oBottom)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"dxfId"			, m_oDxfId)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"equalAverage"	, m_oEqualAverage)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"operator"		, m_oOperator)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"percent"		, m_oPercent)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"priority"		, m_oPriority)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"rank"			, m_oRank)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"stdDev"			, m_oStdDev)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"stopIfTrue"		, m_oStopIfTrue)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"text"			, m_oText)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"timePeriod"		, m_oTimePeriod)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"type"			, m_oType)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"id"				, m_oId)*/

		//serialize
		/*var res = c_oSerConstants.ReadOk;
			var oThis = this;
			var oConditionalFormattingRuleElement = null;

			if (c_oSer_ConditionalFormattingRule.AboveAverage === type)
				oConditionalFormattingRule.aboveAverage = this.stream.GetBool();
			else if (c_oSer_ConditionalFormattingRule.Bottom === type)
				oConditionalFormattingRule.bottom = this.stream.GetBool();
			else if (c_oSer_ConditionalFormattingRule.DxfId === type)
			{
				var DxfId = this.stream.GetULongLE();
				oConditionalFormattingRule.dxf = this.Dxfs[DxfId];
			}
			else if (c_oSer_ConditionalFormattingRule.Dxf === type)
			{
				var oDxf = new AscCommonExcel.CellXfs();
				res = this.bcr.Read1(length, function(t,l){
					return oThis.oReadResult.stylesTableReader.ReadDxf(t,l,oDxf);
				});
				oConditionalFormattingRule.dxf = oDxf;
			}
			else if (c_oSer_ConditionalFormattingRule.EqualAverage === type)
				oConditionalFormattingRule.equalAverage = this.stream.GetBool();
			else if (c_oSer_ConditionalFormattingRule.Operator === type)
				oConditionalFormattingRule.operator = this.stream.GetUChar();
			else if (c_oSer_ConditionalFormattingRule.Percent === type)
				oConditionalFormattingRule.percent = this.stream.GetBool();
			else if (c_oSer_ConditionalFormattingRule.Priority === type)
				oConditionalFormattingRule.priority = this.stream.GetULongLE();
			else if (c_oSer_ConditionalFormattingRule.Rank === type)
				oConditionalFormattingRule.rank = this.stream.GetULongLE();
			else if (c_oSer_ConditionalFormattingRule.StdDev === type)
				oConditionalFormattingRule.stdDev = this.stream.GetULongLE();
			else if (c_oSer_ConditionalFormattingRule.StopIfTrue === type)
				oConditionalFormattingRule.stopIfTrue = this.stream.GetBool();
			else if (c_oSer_ConditionalFormattingRule.Text === type)
				oConditionalFormattingRule.text = this.stream.GetString2LE(length);
			else if (c_oSer_ConditionalFormattingRule.TimePeriod === type)
				oConditionalFormattingRule.timePeriod = this.stream.GetString2LE(length);
			else if (c_oSer_ConditionalFormattingRule.Type === type)
				oConditionalFormattingRule.type = this.stream.GetUChar();
			else if (c_oSer_ConditionalFormattingRule.ColorScale === type) {
				oConditionalFormattingRuleElement = new AscCommonExcel.CColorScale();
				res = this.bcr.Read1(length, function (t, l) {
					return oThis.ReadColorScale(t, l, oConditionalFormattingRuleElement);
				});
				oConditionalFormattingRule.aRuleElements.push(oConditionalFormattingRuleElement);
			} else if (c_oSer_ConditionalFormattingRule.DataBar === type) {
				oConditionalFormattingRuleElement = new AscCommonExcel.CDataBar();
				res = this.bcr.Read1(length, function (t, l) {
					return oThis.ReadDataBar(t, l, oConditionalFormattingRuleElement);
				});
				oConditionalFormattingRule.aRuleElements.push(oConditionalFormattingRuleElement);
			} else if (c_oSer_ConditionalFormattingRule.FormulaCF === type) {
				oConditionalFormattingRuleElement = new AscCommonExcel.CFormulaCF();
				oConditionalFormattingRuleElement.Text = this.stream.GetString2LE(length);
				oConditionalFormattingRule.aRuleElements.push(oConditionalFormattingRuleElement);
			} else if (c_oSer_ConditionalFormattingRule.IconSet === type) {
				oConditionalFormattingRuleElement = new AscCommonExcel.CIconSet();
				res = this.bcr.Read1(length, function (t, l) {
					return oThis.ReadIconSet(t, l, oConditionalFormattingRuleElement);
				});
				oConditionalFormattingRule.aRuleElements.push(oConditionalFormattingRuleElement);
			} else if (c_oSer_ConditionalFormattingRule.isExt === type) {
				ext.isExt = this.stream.GetBool();
			} else
				res = c_oSerConstants.ReadUnknown;
		return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("aboveAverage" === reader.GetName()) {
				val = reader.GetValueBool();
				this.aboveAverage = val;
			} else if ("bottom" === reader.GetName()) {
				val = reader.GetValueBool();
				this.bottom = val;
			} else if ("dxfId" === reader.GetName()) {
				//TODO union
				/*var DxfId = this.stream.GetULongLE();
				oConditionalFormattingRule.dxf = this.Dxfs[DxfId];*/
				val = reader.GetValueInt();
				this.dxf = val;
				//TODO dxf
			} else if ("equalAverage" === reader.GetName()) {
				val = reader.GetValueBool();
				this.equalAverage = val;
			} else if ("operator" === reader.GetName()) {
				val = reader.GetValue();
				this.operator = val;
			} else if ("percent" === reader.GetName()) {
				val = reader.GetValueBool();
				this.percent = val;
			} else if ("priority" === reader.GetName()) {
				val = reader.GetValueInt();
				this.priority = val;
			} else if ("rank" === reader.GetName()) {
				val = reader.GetValueInt();
				this.rank = val;
			} else if ("stdDev" === reader.GetName()) {
				val = reader.GetValueInt();
				this.stdDev = val;
			} else if ("stopIfTrue" === reader.GetName()) {
				val = reader.GetValueBool();
				this.stopIfTrue = val;
			} else if ("text" === reader.GetName()) {
				val = reader.GetValue();
				this.text = val;
			} else if ("timePeriod" === reader.GetName()) {
				val = reader.GetValue();
				this.timePeriod = val;
			} else if ("type" === reader.GetName()) {
				val = reader.GetValue();
				this.type = val;
			}  /*else if ("id" === reader.GetName()) {
				val = reader.GetValue();
				this.type = val;
			}*/

		}
	};

	AscCommonExcel.CConditionalFormattingRule.prototype.toXml = function (writer, bExtendedWrite) {

		/*if (false == isValid()) return;

			std::wstring node_name = bExtendedWrite ? L"x14:cfRule" : L"cfRule";

			writer.WriteString(L"<" + node_name);
				WritingStringAttrString(L"type", m_oType->ToString());
				WritingStringAttrInt(L"priority", m_oPriority->GetValue());
				if (m_oAboveAverage.IsInit() && false == m_oAboveAverage->ToBool())
					writer.WriteString(L" aboveAverage=\"0\"");
				if (m_oBottom.IsInit() && true == m_oBottom->ToBool())
					writer.WriteString(L" bottom=\"1\"");
				WritingStringNullableAttrInt(L"dxfId", m_oDxfId, m_oDxfId->GetValue());
				if (m_oEqualAverage.IsInit() && true == m_oEqualAverage->ToBool())
					writer.WriteString(L" equalAverage=\"1\"");
				WritingStringNullableAttrString(L"operator", m_oOperator, m_oOperator->ToString());
				if (m_oPercent.IsInit() && true == m_oPercent->ToBool())
					writer.WriteString(L" percent=\"1\"");
				WritingStringNullableAttrInt(L"rank", m_oRank, m_oRank->GetValue());
				WritingStringNullableAttrInt(L"stdDev", m_oStdDev, m_oStdDev->GetValue());
				if (m_oStopIfTrue.IsInit() && true == m_oStopIfTrue->ToBool())
					writer.WriteString(L" stopIfTrue=\"1\"");
				WritingStringNullableAttrEncodeXmlString(L"text", m_oText, m_oText.get());
				WritingStringNullableAttrString(L"timePeriod", m_oTimePeriod, m_oTimePeriod->ToString());

				if (bExtendedWrite)
				{
					if (false == m_oId.IsInit())
					{
						WritingStringAttrString(L"id", L"{" + XmlUtils::GenerateGuid() + L"}");
					}
					else
						WritingStringNullableAttrString(L"id", m_oId, m_oId.get());
				}
			writer.WriteString(L">");

			if (m_oIconSet.IsInit())
				m_oIconSet->toXML2(writer, bExtendedWrite);
			if (m_oColorScale.IsInit())
				m_oColorScale->toXML2(writer, bExtendedWrite);
			if (m_oDataBar.IsInit())
				m_oDataBar->toXML2(writer, bExtendedWrite);

			for (size_t i = 0; i < m_arrFormula.size(); i++)
			{
				if (m_arrFormula[i].IsInit())
					m_arrFormula[i]->toXML2(writer, bExtendedWrite);
			}

			if (m_oDxf.IsInit() && bExtendedWrite)
			{
				m_oDxf->toXML2(writer, L"x14:dxf");
			}

			writer.WriteString(L"</" + node_name + L">");*/

		var node_name = bExtendedWrite ? "x14:cfRule" : "cfRule";

		writer.WriteXmlString("<" + node_name);
		writer.WriteXmlAttributeString("type", this.type);
		writer.WriteXmlAttributeNumber("priority", this.priority);

		if (false === this.aboveAverage) {
			writer.WriteXmlString(" aboveAverage=\"0\"");
		}
		if (false === this.bottom) {
			writer.WriteXmlString(" bottom=\"1\"");
		}
		writer.WriteXmlNullableAttributeNumber("dxfId", this.dxfId);
		if (true === this.equalAverage) {
			writer.WriteXmlString(" equalAverage=\"1\"");
		}
		writer.WriteXmlNullableAttributeString("operator", this.operator);
		if (true === this.percent) {
			writer.WriteXmlString(" percent=\"1\"");
		}
		writer.WriteXmlNullableAttributeNumber("rank", this.rank);
		writer.WriteXmlNullableAttributeNumber("stdDev", this.stdDev);
		if (true === this.stopIfTrue) {
			writer.WriteXmlString(" stopIfTrue=\"1\"");
		}
		writer.WriteXmlNullableAttributeStringEncode("text", this.text);
		writer.WriteXmlNullableAttributeString("timePeriod", this.timePeriod);

		if (bExtendedWrite) {
			//TODO
			if (this.id) {
				writer.WriteXmlAttributeString("id", this.id);
			} else {
				writer.WriteXmlNullableAttributeString("id", this.id);
			}
		}
		writer.WriteXmlString(">");


		for (var i = 0; i < this.aRuleElements.length; ++i) {
			var elem = this.aRuleElements[i];
			elem.toXML(writer, bExtendedWrite);
		}

		writer.WriteXmlString("</" + node_name + ">");
	};

	AscCommonExcel.CColorScale.prototype.fromXml = function (reader) {

		//documentation
		/*<xsd:complexType name="CT_ColorScale">
		2795 <xsd:sequence>
		2796 <xsd:element name="cfvo" type="CT_Cfvo" minOccurs="2" maxOccurs="unbounded"/>
		2797 <xsd:element name="color" type="CT_Color" minOccurs="2" maxOccurs="unbounded"/>
		2798 </xsd:sequence>*/

		//x2t
		/*if (oReader.IsEmptyNode())
				return;

			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
				if (L"cfvo" == sName)
				{
					nullable<CConditionalFormatValueObject> item(oReader);
					m_arrValues.push_back(item);
				}
				else if (L"color" == sName)
				{
					nullable<CColor> item(oReader);
					m_arrColors.push_back(item);
				}
			}*/

		//serialize
		/* var res = c_oSerConstants.ReadOk;
            var oThis = this;
            var oObject = null;
            if (c_oSer_ConditionalFormattingRuleColorScale.CFVO === type) {
                oObject = new AscCommonExcel.CConditionalFormatValueObject();
                res = this.bcr.Read1(length, function (t, l) {
                    return oThis.ReadCFVO(t, l, oObject);
                });
                oColorScale.aCFVOs.push(oObject);
            } else if (c_oSer_ConditionalFormattingRuleColorScale.Color === type) {
				var color = ReadColorSpreadsheet2(this.bcr, length);
				if (null != color) {
					oColorScale.aColors.push(color);
				}
            } else
                res = c_oSerConstants.ReadUnknown;
            return res;*/

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("cfvo" === name) {
				val = new AscCommonExcel.CConditionalFormatValueObject();
				val.fromXml(reader);
				this.aCFVOs.push(val);
			} else if ("color" === name ) {
				//TODO
				/*val = new AscCommonExcel.CDataBar();
				val.fromXml(reader);
				this.aRuleElements.push(val);*/
			}
		}
	};

	AscCommonExcel.CColorScale.prototype.toXml = function (writer, bExtendedWrite) {

		/*if (1 < m_arrValues.size() && 1 < m_arrColors.size()) // min 2 + 2
			{
				std::wstring sValue;
				writer.WriteString(L"<colorScale>");

				for ( size_t i = 0; i < m_arrValues.size(); ++i)//todooo - проверить можно ли не чередовать,а как есть записать
				{
					if ( m_arrValues[i].IsInit() )
					{
						m_arrValues[i]->toXML2(writer, bExtendedWrite);
					}
					//if ( (i < m_arrColors.size()) && (m_arrColors[i].IsInit()) )
					//{
					//	m_arrColors[i]->toXML(writer);
					//}
				}
				for ( size_t i = 0; i < m_arrColors.size(); ++i)
		{
			if ( m_arrColors[i].IsInit() )
			{
				m_arrColors[i]->toXML(writer);
			}
		}
		writer.WriteString(L"</colorScale>");
	}*/

		if (1 < this.aCFVOs.length && 1 < this.aColors.length) // min 2 + 2
		{
			writer.WriteXmlString("<colorScale>");
			var i;
			for (i = 0; i < this.aCFVOs.length; ++i)//todooo - проверить можно ли не чередовать,а как есть записать
			{
				if (this.aCFVOs[i]) {
					this.aCFVOs[i].toXML(writer, bExtendedWrite);
				}
			}
			for (i = 0/*m_arrValues.length*/; i < this.aColors.length; ++i) {
				if (this.aColors[i]) {
					this.aColors[i].toXML(writer);
				}
			}
			writer.WriteXmlString("</colorScale>");
		}
	};

	AscCommonExcel.CConditionalFormatValueObject.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);

		if (oReader.IsEmptyNode())
			return;

		int nCurDepth = oReader.GetDepth();
		while (oReader.ReadNextSiblingNode(nCurDepth))
		{
			std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
			if (L"formula" == sName || L"f" == sName)
			m_oFormula = oReader;
		}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("formula" === name || "f" === name) {
				//TODO
				this.Val = reader.GetValue();
			}
		}
	};

	AscCommonExcel.CConditionalFormatValueObject.prototype.readAttr = function(reader) {
		//documentation
		/*
		<xsd:attribute name="type" type="ST_CfvoType" use="required"/>
		2823 <xsd:attribute name="val" type="s:ST_Xstring" use="optional"/>
		2824 <xsd:attribute name="gte" type="xsd:boolean" use="optional" default="true"/>
			*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if		(oReader, L"gte"	, m_oGte)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"type"	, m_oType)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"val"	, m_oVal)*/

		//serialize
		/*var res = c_oSerConstants.ReadOk;
            if (c_oSer_ConditionalFormattingValueObject.Gte === type)
                oCFVO.Gte = this.stream.GetBool();
            else if (c_oSer_ConditionalFormattingValueObject.Type === type)
                oCFVO.Type = this.stream.GetUChar();
			else if (c_oSer_ConditionalFormattingValueObject.Val === type || c_oSer_ConditionalFormattingValueObject.Formula === type)
                oCFVO.Val = this.stream.GetString2LE(length);
            else
                res = c_oSerConstants.ReadUnknown;
            return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("gte" === reader.GetName()) {
				val = reader.GetValueBool();
				this.Gte = val;
			} else if ("type" === reader.GetName()) {
				//TODO
				val = reader.GetValue();
				this.Type = val;
			} else if ("val" === reader.GetName()) {
				val = reader.GetValue();
				this.Val = val;
			}
		}
	};

	AscCommonExcel.CConditionalFormatValueObject.prototype.toXml = function (writer, bExtendedWrite) {

		/*if (false == m_oType.IsInit()) return;

			if (bExtendedWrite == false)
			{
				if (m_oType->GetValue() == SimpleTypes::Spreadsheet::autoMin) m_oType->SetValue(SimpleTypes::Spreadsheet::Minimum);
				if (m_oType->GetValue() == SimpleTypes::Spreadsheet::autoMax) m_oType->SetValue(SimpleTypes::Spreadsheet::Maximum);
			}

			std::wstring node_name = bExtendedWrite ? L"x14:cfvo" : L"cfvo";

			writer.WriteString(L"<" + node_name);
				WritingStringAttrString(L"type", m_oType->ToString());
				if (m_oGte.IsInit() && false == m_oGte->ToBool())
				{
					writer.WriteString(L" gte=\"0\"");
				}
				if (!bExtendedWrite)
				{
					if (m_oVal.IsInit())
					{
						WritingStringAttrEncodeXmlString(L"val", m_oVal.get());
					}
					else if (m_oFormula.IsInit())
					{
						WritingStringAttrEncodeXmlString(L"val", m_oFormula->m_sText);
					}

				}
			writer.WriteString(L">");

			if (bExtendedWrite)
			{
				if (true == m_oFormula.IsInit())
				{
					m_oFormula->toXML2(writer, true);
				}
				else if (m_oVal.IsInit())
				{
					CFormulaCF formla; formla.m_sText = m_oVal.get();
					formla.toXML2(writer, true);
				}

			}

			writer.WriteString(L"</" + node_name + L">");*/


		if (bExtendedWrite === false)
		{
			//if (m_oType.GetValue() == SimpleTypes::Spreadsheet::autoMin) m_oType.SetValue(SimpleTypes::Spreadsheet::Minimum);
			//if (m_oType.GetValue() == SimpleTypes::Spreadsheet::autoMax) m_oType.SetValue(SimpleTypes::Spreadsheet::Maximum);
		}

		var node_name = bExtendedWrite ? "x14:cfvo" : "cfvo";

		writer.WriteXmlString("<" + node_name);
		writer.WriteXmlAttributeString("type", this.type);
		if (false === this.gte)
		{
			writer.WriteXmlString(" gte=\"0\"");
		}
		if (!bExtendedWrite)
		{
			if (this.val)
			{
				writer.WriteXmlAttributeStringEncode("val", this.val);
			}
			//TODO
			/*else if (this.formula)
			{
				writer.WriteXmlAttributeStringEncode("val", this.formula);
			}*/

		}
		writer.WriteXmlString(">");

		if (bExtendedWrite)
		{
			//TODO
			/*if (true == m_oFormula.IsInit())
			{
				m_oFormula.toXML2(writer, true);
			}
			else if (m_oVal.IsInit())
			{
				CFormulaCF formla; formla.m_sText = m_oVal.get();
				formla.toXML2(writer, true);
			}*/

		}

		writer.WriteXmlString("</" + node_name + ">");
	};


	/*var x2tFromXml = 'ReadAttributes(oReader);\n' + '\n' + '\t\tif (oReader.IsEmptyNode())\n' + '\t\t\treturn;\n' + '\n' + '\t\tint nCurDepth = oReader.GetDepth();\n' +
		'\t\twhile (oReader.ReadNextSiblingNode(nCurDepth))\n' + '\t\t{\n' + '\t\t\tstd::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());\n' +
		'\t\t\tif (L"cfvo" == sName)\n' + '\t\t\t{\n' + '\t\t\t\tnullable<CConditionalFormatValueObject> item = oReader;\n' + '\t\t\t\tm_arrValues.push_back(item);\n' +
		'\t\t\t}\n' + '\t\t\telse if ( L"color" == sName || L"fillColor" == sName )\n' + '\t\t\t\tm_oColor = oReader;\n' + '\t\t\telse if ( L"axisColor" == sName)\n' +
		'\t\t\t\tm_oAxisColor = oReader;\n' + '\t\t\telse if ( L"borderColor" == sName)\n' + '\t\t\t\tm_oBorderColor = oReader;\n' +
		'\t\t\telse if ( L"negativeFillColor" == sName )\n' + '\t\t\t\tm_oNegativeFillColor = oReader;\n' + '\t\t\telse if ( L"negativeBorderColor" == sName )\n' +
		'\t\t\t\tm_oNegativeBorderColor = oReader;\n' + '\t\t}'

	var _x2t = 'WritingElement_ReadAttributes_Read_if\t\t(oReader, L"maxLength"\t, m_oMaxLength)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"minLength"\t, m_oMinLength)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"showValue"\t, m_oShowValue)\n' + '\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"axisPosition", m_oAxisPosition)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"border"\t\t, m_oBorder)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"gradient"\t, m_oGradient)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"direction"\t, m_oDirection)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"negativeBarColorSameAsPositive", m_oNegativeBarColorSameAsPositive)\n' +
		'\t\tWritingElement_ReadAttributes_Read_else_if\t(oReader, L"negativeBarBorderColorSameAsPositive", m_oNegativeBarBorderColorSameAsPositive)';

	var _documentation = '<xsd:complexType name="CT_DataBar">\n' + '\t\t\t2801 <xsd:sequence>\n' +
		'\t\t\t2802 <xsd:element name="cfvo" type="CT_Cfvo" minOccurs="2" maxOccurs="2"/>\n' +
		'\t\t\t2803 <xsd:element name="color" type="CT_Color" minOccurs="1" maxOccurs="1"/>\n' + '\t\t\t2804 </xsd:sequence>\n' +
		'\t\t\t2805 <xsd:attribute name="minLength" type="xsd:unsignedInt" use="optional" default="10"/>\n' +
		'\t\t\t2806 <xsd:attribute name="maxLength" type="xsd:unsignedInt" use="optional" default="90"/>\n' +
		'\t\t\t2807 <xsd:attribute name="showValue" type="xsd:boolean" use="optional" default="true"/>\n' + '\t\t\t2808 </xsd:complexType>'

	var _serialize = '' +
		'            if (c_oSer_ConditionalFormattingDataBar.MaxLength === type)\n' + '                oDataBar.MaxLength = this.stream.GetULongLE();\n' +
		'            else if (c_oSer_ConditionalFormattingDataBar.MinLength === type)\n' + '                oDataBar.MinLength = this.stream.GetULongLE();\n' +
		'            else if (c_oSer_ConditionalFormattingDataBar.ShowValue === type)\n' + '                oDataBar.ShowValue = this.stream.GetBool();\n' +
		'            else if (c_oSer_ConditionalFormattingDataBar.Color === type) {\n' + '\t\t\t\tvar color = ReadColorSpreadsheet2(this.bcr, length);\n' +
		'\t\t\t\tif (color) {\n' + '\t\t\t\t\toDataBar.Color = color;\n' + '\t\t\t\t}\n' + '\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.NegativeColor === type) {\n' +
		'\t\t\t\tvar color = ReadColorSpreadsheet2(this.bcr, length);\n' + '\t\t\t\tif (color) {\n' + '\t\t\t\t\toDataBar.NegativeColor = color;\n' + '\t\t\t\t}\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.BorderColor === type) {\n' + '\t\t\t\tvar color = ReadColorSpreadsheet2(this.bcr, length);\n' +
		'\t\t\t\tif (color) {\n' + '\t\t\t\t\toDataBar.BorderColor = color;\n' + '\t\t\t\t}\n' + '\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.AxisColor === type) {\n' +
		'\t\t\t\tvar color = ReadColorSpreadsheet2(this.bcr, length);\n' + '\t\t\t\tif (color) {\n' + '\t\t\t\t\toDataBar.AxisColor = color;\n' + '\t\t\t\t} else {\n' +
		'\t\t\t\t\toDataBar.AxisColor = new AscCommonExcel.RgbColor(0);\n' + '\t\t\t\t}\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.NegativeBorderColor === type) {\n' + '\t\t\t\tvar color = ReadColorSpreadsheet2(this.bcr, length);\n' +
		'\t\t\t\tif (color) {\n' + '\t\t\t\t\toDataBar.NegativeBorderColor = color;\n' + '\t\t\t\t}\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.AxisPosition === type) {\n' + '\t\t\t\toDataBar.AxisPosition = this.stream.GetULongLE();\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.Direction === type) {\n' + '\t\t\t\toDataBar.Direction = this.stream.GetULongLE();\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.GradientEnabled === type) {\n' + '\t\t\t\toDataBar.Gradient = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.NegativeBarColorSameAsPositive === type) {\n' +
		'\t\t\t\toDataBar.NegativeBarColorSameAsPositive = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSer_ConditionalFormattingDataBar.NegativeBarBorderColorSameAsPositive === type) {\n' +
		'\t\t\t\toDataBar.NegativeBarBorderColorSameAsPositive = this.stream.GetBool();\n' + '            } else if (c_oSer_ConditionalFormattingDataBar.CFVO === type) {\n' +
		'                oObject = new AscCommonExcel.CConditionalFormatValueObject();\n' + '                res = this.bcr.Read1(length, function (t, l) {\n' +
		'                    return oThis.ReadCFVO(t, l, oObject);\n' + '                });\n' + '                oDataBar.aCFVOs.push(oObject);\n' + '            } else\n' +
		'                res = c_oSerConstants.ReadUnknown;\n' + '            return res;'*/

	AscCommonExcel.CDataBar.prototype.fromXml = function (reader) {
		if (!reader.ReadNextNode()) {
			return;
		}

		this.readAttr(reader);

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("cfvo" === name) {
				val = new AscCommonExcel.CConditionalFormatValueObject();
				val.fromXml(reader);
				this.aCFVOs.push(val);
			} else if ("color" === name ) {
				//TODO
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oDataBar.BorderColor = color;
				}*/
			} else if ("color" === name || "fillColor" === name) {
				//TODO
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oDataBar.BorderColor = color;
				}*/
			} else if ("axisColor" === name) {
				//TODO
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oDataBar.BorderColor = color;
				}*/
			} else if ("borderColor" === name) {
				//TODO
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oDataBar.BorderColor = color;
				}*/
			} else if ("negativeFillColor" === name) {
				//TODO
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oDataBar.BorderColor = color;
				}*/
			}  else if ("negativeBorderColor" === name) {
				//TODO
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oDataBar.BorderColor = color;
				}*/
			}
		}
	};

	AscCommonExcel.CDataBar.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {
			if ("maxLength" === reader.GetName()) {
				val = reader.GetValueInt();
				this.MaxLength = val;
			} else if ("minLength" === reader.GetName()) {
				val = reader.GetValueInt();
				this.MinLength = val;
			} else if ("showValue" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowValue = val;
			} else if ("axisPosition" === reader.GetName()) {
				val = reader.GetValueInt();
				this.AxisPosition = val;
			} else if ("border" === reader.GetName()) {
				val = reader.GetValue;
				this.Border = val;
			} else if ("gradient" === reader.GetName()) {
				val = reader.GetValueBool();
				this.Gradient = val;
			} else if ("direction" === reader.GetName()) {
				val = reader.GetValueInt();
				this.Direction = val;
			} else if ("negativeBarColorSameAsPositive" === reader.GetName()) {
				val = reader.GetValueBool();
				this.NegativeBarColorSameAsPositive = val;
			} else if ("negativeBarBorderColorSameAsPositive" === reader.GetName()) {
				val = reader.GetValueBool();
				this.NegativeBarBorderColorSameAsPositive = val;
			}
		}
	};

	AscCommonExcel.CDataBar.prototype.toXml = function (writer, bExtendedWrite) {

		/*if (2 != m_arrValues.size() || false == m_oColor.IsInit()) return;

			std::wstring node_name = bExtendedWrite ? L"x14:dataBar" : L"dataBar";

			writer.WriteString(L"<" + node_name);
				WritingStringNullableAttrInt(L"maxLength", m_oMaxLength, m_oMaxLength->GetValue());
				WritingStringNullableAttrInt(L"minLength", m_oMinLength, m_oMinLength->GetValue());
				if (m_oShowValue.IsInit() && false == m_oShowValue->ToBool())
				{
					writer.WriteString(L" showValue=\"0\"");
				}
				if (bExtendedWrite)
				{
					if (m_oBorderColor.IsInit()) writer.WriteString(L" border=\"1\"");
					WritingStringNullableAttrString(L"axisPosition", m_oAxisPosition, m_oAxisPosition->ToString())
					WritingStringNullableAttrString(L"direction", m_oDirection, m_oDirection->ToString())

					if (m_oGradient.IsInit() && false == m_oGradient->ToBool())
					{
						writer.WriteString(L" gradient=\"0\"");
					}
					if (m_oNegativeBarColorSameAsPositive.IsInit() && true == m_oNegativeBarColorSameAsPositive->ToBool())
					{
						writer.WriteString(L" negativeBarColorSameAsPositive=\"1\"");
					}
					if (m_oNegativeBarBorderColorSameAsPositive.IsInit() && false == m_oNegativeBarBorderColorSameAsPositive->ToBool())
					{
						writer.WriteString(L" negativeBarBorderColorSameAsPositive=\"0\"");
					}
				}
			writer.WriteString(L">");

			for ( size_t i = 0; i < m_arrValues.size(); ++i)
			{
				if (  m_arrValues[i].IsInit() )
				{
					m_arrValues[i]->toXML2(writer, bExtendedWrite);
				}
			}

			m_oColor->toXML2(writer, bExtendedWrite ? L"x14:fillColor" : L"color");

			if (bExtendedWrite)
			{
				if (m_oBorderColor.IsInit())		m_oBorderColor->toXML2(writer, L"x14:borderColor");
				if (m_oNegativeFillColor.IsInit())	m_oNegativeFillColor->toXML2(writer, L"x14:negativeFillColor");
				if (m_oNegativeBorderColor.IsInit())m_oNegativeBorderColor->toXML2(writer, L"x14:negativeBorderColor");
				if (m_oAxisColor.IsInit())			m_oAxisColor->toXML2(writer, L"x14:axisColor");
			}

			writer.WriteString(L"</" + node_name + L">");*/

		//TODO
		if (2 != this.aCFVOs.length || false == this.Color) {
			return;
		}

		var node_name = bExtendedWrite ? "x14:dataBar" : "dataBar";

		writer.WriteXmlString("<" + node_name);
		writer.WriteXmlNullableAttributeNumber("maxLength", this.MaxLength);
		writer.WriteXmlNullableAttributeNumber("minLength", this.MinLength);
		if (false === this.ShowValue) {
			writer.WriteXmlString(" showValue=\"0\"");
		}
		if (bExtendedWrite) {
			if (this.Border) {
				writer.WriteXmlString(" border=\"1\"");
			}
			writer.WriteXmlNullableAttributeString("axisPosition", this.AxisPosition);
			writer.WriteXmlNullableAttributeString("direction", this.Direction);

			if (false === this.Gradient) {
				writer.WriteXmlString(" gradient=\"0\"");
			}
			if (true === this.NegativeBarColorSameAsPositive) {
				writer.WriteXmlString(" negativeBarColorSameAsPositive=\"1\"");
			}
			if (false === this.NegativeBarBorderColorSameAsPositive) {
				writer.WriteXmlString(" negativeBarBorderColorSameAsPositive=\"0\"");
			}
		}
		writer.WriteXmlString(">");

		for (var i = 0; i < this.aCFVOs.length; ++i) {
			if (this.aCFVOs[i]) {
				this.aCFVOs[i].toXML(writer, bExtendedWrite);
			}
		}

		//TODO
		/*-this.Color.toXML(writer, bExtendedWrite ? "x14:fillColor" : "color");

		if (bExtendedWrite)
		{
			if (m_oBorderColor.IsInit())		m_oBorderColor.toXML2(writer, "x14:borderColor");
			if (m_oNegativeFillColor.IsInit())	m_oNegativeFillColor.toXML2(writer, "x14:negativeFillColor");
			if (m_oNegativeBorderColor.IsInit())m_oNegativeBorderColor.toXML2(writer, "x14:negativeBorderColor");
			if (m_oAxisColor.IsInit())			m_oAxisColor.toXML2(writer, "x14:axisColor");
		}*/

		writer.WriteXmlString("</" + node_name + ">");
	};

	AscCommonExcel.CIconSet.prototype.fromXml = function (reader) {
		if (this.readAttr) {
			this.readAttr(reader);
		}

		if (reader.IsEmptyNode()) {
			return;
		}

		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("cfvo" === name) {
				val = new AscCommonExcel.CConditionalFormatValueObject();
				val.fromXml(reader);
				this.aCFVOs.push(val);
			} else if ("cfIcon" === name) {
				val = new AscCommonExcel.CConditionalFormatIconSet();
				val.fromXml(reader);
				this.aIconSets.push(val);
			}
		}

		//TODO
		/*ReadAttributes(oReader);

			if (oReader.IsEmptyNode())
				return;

			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
				if (L"cfvo" == sName)
				{
					nullable<CConditionalFormatValueObject> item(oReader);
					m_arrValues.push_back(item);
				}
				else if (L"cfIcon" == sName)
				{
					nullable<CConditionalFormatIconSet> item(oReader);
					m_arrIconSets.push_back(item);
				}
			}*/

	};

	AscCommonExcel.CIconSet.prototype.toXml = function (writer, bExtendedWrite) {

		/*if (m_arrValues.size() < 2) return;	// min value = 2

			std::wstring node_name = bExtendedWrite ? L"x14:iconSet" : L"iconSet";

			std::wstring sValue;
			writer.WriteString(L"<" + node_name);
			WritingStringNullableAttrString(L"iconSet", m_oIconSet, m_oIconSet->ToString())
			if (m_oPercent.IsInit() && false == m_oPercent->ToBool())
			{
				writer.WriteString(L" percent=\"0\"");
			}
			if (m_oReverse.IsInit() && true == m_oReverse->ToBool())
			{
				writer.WriteString(L" reverse=\"1\"");
			}
			if (m_oShowValue.IsInit() && false == m_oShowValue->ToBool())
			{
				writer.WriteString(L" showValue=\"0\"");
			}
			if (bExtendedWrite && false == m_arrIconSets.empty())
			{
				writer.WriteString(L" custom=\"1\"");
			}
			writer.WriteString(L">");

			for ( size_t i = 0; i < m_arrValues.size(); ++i)
			{
				if ( m_arrValues[i].IsInit() )
				{
					m_arrValues[i]->toXML2(writer, bExtendedWrite);
				}
			}
			for ( size_t i = 0; bExtendedWrite && i < m_arrIconSets.size(); ++i)
			{
				if ( m_arrIconSets[i].IsInit() )
				{
					m_arrIconSets[i]->toXML2(writer, bExtendedWrite);
				}
			}
			writer.WriteString(L"</" + node_name + L">");*/

		if (this.aCFVOs.length < 2) {
			return;
		}	// min value = 2

		var node_name = bExtendedWrite ? "x14:iconSet" : "iconSet";

		writer.WriteXmlString("<" + node_name);
		writer.WriteXmlNullableAttributeString("iconSet", this.IconSet);
		if (false === this.Percent) {
			writer.WriteXmlString(" percent=\"0\"");
		}
		if (true === this.Reverse) {
			writer.WriteXmlString(" reverse=\"1\"");
		}
		if (false === this.ShowValue) {
			writer.WriteXmlString(" showValue=\"0\"");
		}
		if (bExtendedWrite && this.aIconSets && this.aIconSets.length) {
			writer.WriteXmlString(" custom=\"1\"");
		}
		writer.WriteXmlString(">");

		var i;
		for (i = 0; i < this.aCFVOs.length; ++i) {
			if (this.aCFVOs[i]) {
				this.aCFVOs[i].toXML(writer, bExtendedWrite);
			}
		}
		for (i = 0; bExtendedWrite && i < this.aIconSets.length; ++i) {
			if (this.aIconSets[i]) {
				this.aIconSets[i].toXML(writer, bExtendedWrite);
			}
		}

		writer.WriteXmlString("</" + node_name + ">");
	};

	AscCommonExcel.CConditionalFormatIconSet.prototype.fromXml = function (reader) {
		this.readAttr(reader);
		reader.ReadTillEnd();

		/*ReadAttributes(oReader);

		if (oReader.IsEmptyNode())
			return;*/
	};

	AscCommonExcel.CConditionalFormatIconSet.prototype.readAttr = function(reader) {
		//documentation
		/*xsd:attribute name="iconSet" type="ST_IconSetType" use="required"/>
		72 <xsd:attribute name="iconId" type="xsd:unsignedInt" use="optional"/>*/

		//x2t
		/*WritingElement_ReadAttributes_Read_if		(oReader, L"iconSet", m_oIconSet)
			WritingElement_ReadAttributes_Read_else_if	(oReader, L"iconId"	, m_oIconId)*/

		//serialize
		/*  if (c_oSer_ConditionalFormattingIcon.iconSet === type)
				oCFVO.IconSet = this.stream.GetLong();
			else if (c_oSer_ConditionalFormattingIcon.iconId === type)
				oCFVO.IconId = this.stream.GetLong();
			else*/


		var val;
		while (reader.MoveToNextAttribute()) {
			if ("iconSet" === reader.GetName()) {
				val = reader.GetValueInt();
				this.IconSet = val;
			} else if ("iconId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.IconId = val;
			}
		}
	};

	AscCommonExcel.CConditionalFormatIconSet.prototype.toXml = function (writer, bExtendedWrite) {

		/*if (!bExtendedWrite) return;

			writer.WriteString(L"<x14:cfIcon");
				WritingStringNullableAttrString(L"iconSet", m_oIconSet, m_oIconSet->ToString())
				WritingStringNullableAttrInt(L"iconId", m_oIconId, m_oIconId->GetValue())
			writer.WriteString(L"/>");*/

		if (!bExtendedWrite) {
			return;
		}

		writer.WriteXmlString("<x14:cfIcon");
		writer.WriteXmlNullableAttributeString("iconSet", this.IconSet);
		writer.WriteXmlNullableAttributeNumber("iconId", this.IconId);
		writer.WriteXmlString("/>");
	};

	//SheetPr
	AscCommonExcel.asc_CSheetPr.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( (L"tabColor") == sName )
								m_oTabColor = oReader;
							else if ( (L"pageSetUpPr") == sName )
								m_oPageSetUpPr = oReader;
							else if ( (L"outlinePr") == sName )
								m_oOutlinePr = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("tabColor" === name) {
				//TODO ReadColorSpreadsheet2
				/*var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					oSheetPr.TabColor = color;
				}*/
			} else if ("pageSetUpPr" === name) {
				val = new CPageSetUpPr();
				val.fromXml(reader);
				this.PageSetUpPr = val
			} else if ("outlinePr" === name) {
				val = new COutlinePr();
				val.fromXml(reader);
				this.OutlinePr = val;
			}
		}
	};

	AscCommonExcel.asc_CSheetPr.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:sequence>
		2331 <xsd:element name="tabColor" type="CT_Color" minOccurs="0" maxOccurs="1"/>
		2332 <xsd:element name="outlinePr" type="CT_OutlinePr" minOccurs="0" maxOccurs="1"/>
		2333 <xsd:element name="pageSetUpPr" type="CT_PageSetUpPr" minOccurs="0" maxOccurs="1"/>
		2334 </xsd:sequence>
		2335 <xsd:attribute name="syncHorizontal" type="xsd:boolean" use="optional" default="false"/>
		2336 <xsd:attribute name="syncVertical" type="xsd:boolean" use="optional" default="false"/>
		2337 <xsd:attribute name="syncRef" type="ST_Ref" use="optional"/>
		2338 <xsd:attribute name="transitionEvaluation" type="xsd:boolean" use="optional" default="false"/>
		2339 <xsd:attribute name="transitionEntry" type="xsd:boolean" use="optional" default="false"/>
		2340 <xsd:attribute name="published" type="xsd:boolean" use="optional" default="true"/>
		2341 <xsd:attribute name="codeName" type="xsd:string" use="optional"/>
		2342 <xsd:attribute name="filterMode" type="xsd:boolean" use="optional" default="false"/>
		2343 <xsd:attribute name="enableFormatConditionsCalculation" type="xsd:boolean" use="optional"*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"codeName"),							m_oCodeName )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"enableFormatConditionsCalculation"),	m_oEnableFormatConditionsCalculation )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"filterMode"),						m_oFilterMode )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"published"),							m_oPublished )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"syncHorizontal"),					m_oSyncHorizontal )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"syncRef"),							m_oSyncRef )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"syncVertical"),						m_oSyncVertical )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"transitionEntry"),					m_oTransitionEntry )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"transitionEvaluation"),				m_oTransitionEvaluation )*/

//serialize
		/* if (c_oSer_SheetPr.CodeName === type)
						oSheetPr.CodeName = this.stream.GetString2LE(length);
					else if (c_oSer_SheetPr.EnableFormatConditionsCalculation === type)
						oSheetPr.EnableFormatConditionsCalculation = this.stream.GetBool();
					else if (c_oSer_SheetPr.FilterMode === type)
						oSheetPr.FilterMode = this.stream.GetBool();
					else if (c_oSer_SheetPr.Published === type)
						oSheetPr.Published = this.stream.GetBool();
					else if (c_oSer_SheetPr.SyncHorizontal === type)
						oSheetPr.SyncHorizontal = this.stream.GetBool();
					else if (c_oSer_SheetPr.SyncRef === type)
						oSheetPr.SyncRef = this.stream.GetString2LE(length);
					else if (c_oSer_SheetPr.SyncVertical === type)
						oSheetPr.SyncVertical = this.stream.GetBool();
					else if (c_oSer_SheetPr.TransitionEntry === type)
						oSheetPr.TransitionEntry = this.stream.GetBool();
					else if (c_oSer_SheetPr.TransitionEvaluation === type)
						oSheetPr.TransitionEvaluation = this.stream.GetBool();
					else if (c_oSer_SheetPr.TabColor === type) {
						var color = ReadColorSpreadsheet2(this.bcr, length);
						if (color) {
							oSheetPr.TabColor = color;
						}
					} else if (c_oSer_SheetPr.PageSetUpPr === type) {
						res = this.bcr.Read1(length, function (t, l) {
							return oThis.ReadPageSetUpPr(t, l, oSheetPr);
						});
					} else if (c_oSer_SheetPr.OutlinePr === type) {
						res = this.bcr.Read1(length, function (t, l) {
							return oThis.ReadOutlinePr(t, l, oSheetPr);
						});
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("codeName" === reader.GetName()) {
				val = reader.GetValue();
				this.CodeName = val;
			} else if ("enableFormatConditionsCalculation" === reader.GetName()) {
				val = reader.GetValueBool();
				this.EnableFormatConditionsCalculation = val;
			} else if ("filterMode" === reader.GetName()) {
				val = reader.GetValueBool();
				this.FilterMode = val;
			} else if ("published" === reader.GetName()) {
				val = reader.GetValueBool();
				this.Published = val;
			} else if ("syncHorizontal" === reader.GetName()) {
				val = reader.GetValueBool();
				this.SyncHorizontal = val;
			} else if ("syncRef" === reader.GetName()) {
				val = reader.GetValue();
				this.SyncRef = val;
			} else if ("syncVertical" === reader.GetName()) {
				val = reader.GetValueBool();
				this.SyncVertical = val;
			} else if ("transitionEntry" === reader.GetName()) {
				val = reader.GetValueBool();
				this.TransitionEntry = val;
			} else if ("transitionEvaluation" === reader.GetName()) {
				val = reader.GetValueBool();
				this.TransitionEvaluation = val;
			}
		}
	};

	AscCommonExcel.asc_CSheetPr.prototype.toXml = function (writer) {

		/*writer.WriteString((L"<sheetPr"));
						WritingStringNullableAttrEncodeXmlString(L"codeName", m_oCodeName, m_oCodeName.get());
						WritingStringNullableAttrBool(L"enableFormatConditionsCalculation", m_oEnableFormatConditionsCalculation);
						WritingStringNullableAttrBool(L"filterMode", m_oFilterMode);
						WritingStringNullableAttrBool(L"published", m_oPublished);
						WritingStringNullableAttrBool(L"syncHorizontal", m_oSyncHorizontal);
						WritingStringNullableAttrEncodeXmlString(L"syncRef", m_oSyncRef, m_oSyncRef.get());
						WritingStringNullableAttrBool(L"syncVertical", m_oSyncVertical);
						WritingStringNullableAttrBool(L"transitionEntry", m_oTransitionEntry);
						WritingStringNullableAttrBool(L"transitionEvaluation", m_oTransitionEvaluation);
						writer.WriteString((L">"));
						if (m_oTabColor.IsInit())
						{
							m_oTabColor->toXML2(writer, (L"tabColor"));
						}
						if (m_oOutlinePr.IsInit())
						{
							m_oOutlinePr->toXML(writer);
						}
						if (m_oPageSetUpPr.IsInit())
						{
							m_oPageSetUpPr->toXML(writer);
						}
						writer.WriteString((L"</sheetPr>"));*/

		writer.WriteXmlString(("<sheetPr"));
		writer.WriteXmlNullableAttributeStringEncode("codeName", this.CodeName);
		writer.WriteXmlNullableAttributeBool("enableFormatConditionsCalculation", this.EnableFormatConditionsCalculation);
		writer.WriteXmlNullableAttributeBool("filterMode", this.FilterMode);
		writer.WriteXmlNullableAttributeBool("published", this.Published);
		writer.WriteXmlNullableAttributeBool("syncHorizontal", this.SyncHorizontal);
		writer.WriteXmlNullableAttributeStringEncode("syncRef", this.SyncRef);
		writer.WriteXmlNullableAttributeBool("syncVertical", this.SyncVertical);
		writer.WriteXmlNullableAttributeBool("transitionEntry", this.TransitionEntry);
		writer.WriteXmlNullableAttributeBool("transitionEvaluation", this.TransitionEvaluation);
		writer.WriteXmlString((">"));

		if (this.TabColor)
		{
			//TODO
			this.TabColor.toXML(writer,"tabColor");
		}
		if (this.OutlinePr)
		{
			this.OutlinePr.toXML(writer);
		}
		if (this.PageSetUpPr)
		{
			this.PageSetUpPr.toXML(writer);
		}
		writer.WriteXmlString(("</sheetPr>"));
	};

	function CPageSetUpPr() {

	}
	CPageSetUpPr.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};
	CPageSetUpPr.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:attribute name="autoPageBreaks" type="xsd:boolean" use="optional" default="true"/>
		2456 <xsd:attribute name="fitToPage" type="xsd:boolean" use="optional" default="false"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"autoPageBreaks"), m_oAutoPageBreaks )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"fitToPage"),	m_oFitToPage )*/

//serialize
		/*var res = c_oSerConstants.ReadOk;
					if (c_oSer_SheetPr.AutoPageBreaks === type) {
						oSheetPr.AutoPageBreaks = this.stream.GetBool();
					} else if (c_oSer_SheetPr.FitToPage === type) {
						oSheetPr.FitToPage = this.stream.GetBool();
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("autoPageBreaks" === reader.GetName()) {
				val = reader.GetValueBool();
				this.AutoPageBreaks = val;
			} else if ("fitToPage" === reader.GetName()) {
				val = reader.GetValueBool();
				this.FitToPage = val;
			}
		}
	};

	CPageSetUpPr.prototype.toXml = function (writer) {

		/*writer.WriteString((L"<pageSetUpPr"));
						WritingStringNullableAttrBool(L"autoPageBreaks", m_oAutoPageBreaks);
						WritingStringNullableAttrBool(L"fitToPage", m_oFitToPage);
						writer.WriteString((L"/>"));*/

		writer.WriteXmlString(("<pageSetUpPr"));
		writer.WriteXmlNullableAttributeBool("autoPageBreaks", this.AutoPageBreaks);
		writer.WriteXmlNullableAttributeBool("fitToPage", this.FitToPage);
		writer.WriteXmlString(("/>"));
	};

	function COutlinePr () {

	}
	COutlinePr.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	COutlinePr.prototype.readAttr = function (reader) {

//documentation
		/*xsd:attribute name="applyStyles" type="xsd:boolean" use="optional" default="false"/>
		2450 <xsd:attribute name="summaryBelow" type="xsd:boolean" use="optional" default="true"/>
		2451 <xsd:attribute name="summaryRight" type="xsd:boolean" use="optional" default="true"/>
		2452 <xsd:attribute name="showOutlineSymbols" type="xsd:boolean" use="optional" default="true"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, (L"applyStyles"), m_oApplyStyles )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"showOutlineSymbols"), m_oShowOutlineSymbols )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"summaryBelow"), m_oSummaryBelow )
						WritingElement_ReadAttributes_Read_else_if	( oReader, (L"summaryRight"), m_oSummaryRight )*/

//serialize
		/*if (c_oSer_SheetPr.ApplyStyles === type) {
						oSheetPr.ApplyStyles = this.stream.GetBool();
					} else if (c_oSer_SheetPr.ShowOutlineSymbols === type) {
						oSheetPr.ShowOutlineSymbols = this.stream.GetBool();
					} else if (c_oSer_SheetPr.SummaryBelow === type) {
						oSheetPr.SummaryBelow = this.stream.GetBool();
					} else if (c_oSer_SheetPr.SummaryRight === type) {
						oSheetPr.SummaryRight = this.stream.GetBool();
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("applyStyles" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyStyles = val;
			} else if ("showOutlineSymbols" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ShowOutlineSymbols = val;
			} else if ("summaryBelow" === reader.GetName()) {
				val = reader.GetValueBool();
				this.SummaryBelow = val;
			} else if ("summaryRight" === reader.GetName()) {
				val = reader.GetValueBool();
				this.SummaryRight = val;
			}
		}
	};

	COutlinePr.prototype.toXml = function (writer) {

		/*writer.WriteString((L"<outlinePr"));
						WritingStringNullableAttrBool(L"applyStyles", m_oApplyStyles);
						WritingStringNullableAttrBool(L"showOutlineSymbols", m_oShowOutlineSymbols);
						WritingStringNullableAttrBool(L"summaryBelow", m_oSummaryBelow);
						WritingStringNullableAttrBool(L"summaryRight", m_oSummaryRight);
						writer.WriteString((L"/>"));*/

		writer.WriteXmlString(("<outlinePr"));
		writer.WriteXmlNullableAttributeBool("applyStyles", this.ApplyStyles);
		writer.WriteXmlNullableAttributeBool("showOutlineSymbols", this.ShowOutlineSymbols);
		writer.WriteXmlNullableAttributeBool("summaryBelow", this.SummaryBelow);
		writer.WriteXmlNullableAttributeBool("summaryRight", this.SummaryRight);
		writer.WriteXmlString(("/>"));
	};



	//***STYLE****
	AscCommonExcel.CT_Stylesheet.prototype.fromXml = function (reader) {

		/*virtual void fromXML(XmlUtils::CXmlLiteReader& oReader)
					{
						if ( oReader.IsEmptyNode() ) return;

						int nStylesDepth = oReader.GetDepth();
						while ( oReader.ReadNextSiblingNode( nStylesDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"borders" == sName )
								m_oBorders = oReader;
							else if ( _T("cellStyles") == sName )
								m_oCellStyles = oReader;
							else if ( L"cellStyleXfs" == sName )
								m_oCellStyleXfs = oReader;
							else if ( L"cellXfs" == sName )
								m_oCellXfs = oReader;
							else if ( L"colors" == sName )
								m_oColors = oReader;
							else if ( L"dxfs" == sName )
								m_oDxfs = oReader;
							//else if ( _T("extLst") == sName )
							//	pItem = new CSi( oReader );
							else if ( L"fills" == sName )
								m_oFills = oReader;
							else if ( L"fonts" == sName )
								m_oFonts = oReader;
							else if ( L"numFmts" == sName )
								m_oNumFmts = oReader;
							else if ( L"tableStyles" == sName )
								m_oTableStyles = oReader;
							else if (L"Style" == sName)
							{
								CStyle2003 *style = new CStyle2003(WritingElement::m_pMainDocument);
								style->fromXML(oReader);

								m_arrStyles2003.push_back( style);
							}
							else if (L"extLst" == sName)
								m_oExtLst = oReader;
						}
						AfterRead();
					}*/

		if (!reader.ReadNextNode()) {
			return;
		}

		var sName = reader.GetNameNoNS();
		var val, depth2, name2;
		if ("styleSheet" === sName) {
			if (reader.IsEmptyNode()) {
				return;
			}
			var depth = reader.GetDepth();
			while (reader.ReadNextSiblingNode(depth)) {
				var name = reader.GetNameNoNS();
				if ("borders" === name) {
					//count
					//this.readAttr(reader);

					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("border" === name2 || "Border" === name2) {
							val = new AscCommonExcel.Border();
							val.fromXml(reader);
							this.borders.push(val);
						}
					}
				} else if ("cellStyleXfs" === name) {
					//count
					//this.readAttr(reader);

					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("xf" === name2) {
							val = new AscCommonExcel.OpenXf();
							val.fromXml(reader);
							this.cellStyleXfs.push(val);
						}
					}
				} else if ("cellXfs" === name) {
					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("xf" === name2) {
							val = new AscCommonExcel.OpenXf();
							val.fromXml(reader);
							this.cellXfs.push(val);
						}
					}
				} else if ("colors" === name) {
					//TODO не вижу в serialize
				} else if ("dxfs" === name) {
					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("dxf" === name2) {
							val = new AscCommonExcel.CellXfs();
							val.fromXml(reader);
							this.dxfs.push(val);
						}
					}
				} else if ("fills" === name) {
					//count
					//this.readAttr(reader);

					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("fill" === name2) {
							val = new AscCommonExcel.Fill();
							val.fromXml(reader);
							this.fills.push(val);
						}
					}
				} else if ("fonts" === name) {
					//count
					//this.readAttr(reader);

					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("font" === name2) {
							val = new AscCommonExcel.Font();
							val.fromXml(reader);
							//TODO wb!
							//val.checkSchemeFont(this.wb.theme);
							this.fonts.push(val);
						}
					}
				} else if ("numFmts" === name) {
					//count
					//this.readAttr(reader);

					if (reader.IsEmptyNode()) {
						continue;
					}
					depth2 = reader.GetDepth();
					while (reader.ReadNextSiblingNode(depth2)) {
						name2 = reader.GetNameNoNS();
						if ("numFmt" === name2) {

							/*if ( c_oSerStylesTypes.NumFmt == type )
							{
								var oNewNumFmt = {f: null, id: null};
								res = this.bcr.Read2Spreadsheet(length, function(t,l){
									return oThis.ReadNumFmt(t,l,oNewNumFmt);
								});
								if (null != oNewNumFmt.id) {
									this.ParseNum(oNewNumFmt, oNumFmts);
								}
							}*/

							val = {f: null, id: null};
							while (reader.MoveToNextAttribute()) {
								if ("formatCode" === reader.GetName()) {
									val.f = reader.GetValue();
								} else if ("numFmtId" === reader.GetName()) {
									val.id = reader.GetValueInt();
								}
							}

							//TODO parseNum
							/*if (null != oNewNumFmt.id) {
								this.ParseNum(oNewNumFmt, oNumFmts);
							}*/
						}
					}
				} else if ("tableStyles" === name) {
					//this.readAttr(reader);
					this.tableStyles.fromXml(reader);
				} else if ("Style" === name) {
					//TODO
				} else if ("extLst" === name) {
					//TODO ExtDxfs ?
				}


				//TODO  - есть в serialize
				/*else if (c_oSerStylesTypes.SlicerStyles === type && typeof Asc.CT_slicerStyles != "undefined") {
					var fileStream = this.stream.ToFileStream();
					fileStream.GetUChar();
					oStyleObject.oCustomSlicerStyles = new Asc.CT_slicerStyles();
					oStyleObject.oCustomSlicerStyles.fromStream(fileStream);
					this.stream.FromFileStream(fileStream);
				}*/
			}
		}
	};


	AscCommonExcel.OpenXf.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );
						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( _T("alignment") == sName )
								m_oAligment = oReader;
							else if( _T("protection") == sName )
								m_oProtection = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("alignment" === name) {
				if (null == this.align) {
					this.align = new AscCommonExcel.Align();
				}
				this.align.fromXml(reader);
			} else if ("protection" === name) {
				while (reader.MoveToNextAttribute()) {
					if ("hidden" === reader.GetName()) {
						this.hidden = reader.GetValueBool();
					} else if ("locked" === reader.GetName()) {
						this.locked = reader.GetValueBool();
					}
				}
			}
		}
	};

	AscCommonExcel.OpenXf.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:complexType name="CT_Xf">
		3610 <xsd:sequence>
		3611 <xsd:element name="alignment" type="CT_CellAlignment" minOccurs="0" maxOccurs="1"/>
		3612 <xsd:element name="protection" type="CT_CellProtection" minOccurs="0" maxOccurs="1"/>
		3613 <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
		3614 </xsd:sequence>
		3615 <xsd:attribute name="numFmtId" type="ST_NumFmtId" use="optional"/>
		3616 <xsd:attribute name="fontId" type="ST_FontId" use="optional"/>
		3617 <xsd:attribute name="fillId" type="ST_FillId" use="optional"/>
		3618 <xsd:attribute name="borderId" type="ST_BorderId" use="optional"/>
		3619 <xsd:attribute name="xfId" type="ST_CellStyleXfId" use="optional"/>
		3620 <xsd:attribute name="quotePrefix" type="xsd:boolean" use="optional" default="false"/>
		3621 <xsd:attribute name="pivotButton" type="xsd:boolean" use="optional" default="false"/>
		3622 <xsd:attribute name="applyNumberFormat" type="xsd:boolean" use="optional"/>
		3623 <xsd:attribute name="applyFont" type="xsd:boolean" use="optional"/>
		3624 <xsd:attribute name="applyFill" type="xsd:boolean" use="optional"/>
		3625 <xsd:attribute name="applyBorder" type="xsd:boolean" use="optional"/>
		3626 <xsd:attribute name="applyAlignment" type="xsd:boolean" use="optional"/>
		3627 <xsd:attribute name="applyProtection" type="xsd:boolean" use="optional"/>
		3628 </xsd:complexType>*/

//x2t
		/*WritingElement_ReadAttributes_Start( oReader )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("applyAlignment"),      m_oApplyAlignment )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("applyBorder"),      m_oApplyBorder )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("applyFill"),      m_oApplyFill )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("applyFont"),      m_oApplyFont )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("applyNumberFormat"),      m_oApplyNumberFormat )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("applyProtection"),      m_oApplyProtection )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("borderId"),      m_oBorderId )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("fillId"),      m_oFillId )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("fontId"),      m_oFontId )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("numFmtId"),      m_oNumFmtId )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("pivotButton"),      m_oPivotButton )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("quotePrefix"),      m_oQuotePrefix )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("xfId"),      m_oXfId )
						WritingElement_ReadAttributes_End( oReader )*/

//serialize
		/* var res = c_oSerConstants.ReadOk;
					var oThis = this;
					if ( c_oSerXfsTypes.ApplyAlignment == type )
						oXfs.ApplyAlignment = this.stream.GetBool();
					else if ( c_oSerXfsTypes.ApplyBorder == type )
						oXfs.ApplyBorder = this.stream.GetBool();
					else if ( c_oSerXfsTypes.ApplyFill == type )
						oXfs.ApplyFill = this.stream.GetBool();
					else if ( c_oSerXfsTypes.ApplyFont == type )
						oXfs.ApplyFont = this.stream.GetBool();
					else if ( c_oSerXfsTypes.ApplyNumberFormat == type )
						oXfs.ApplyNumberFormat = this.stream.GetBool();
					else if ( c_oSerXfsTypes.BorderId == type )
						oXfs.borderid = this.stream.GetULongLE();
					else if ( c_oSerXfsTypes.FillId == type )
						oXfs.fillid = this.stream.GetULongLE();
					else if ( c_oSerXfsTypes.FontId == type )
						oXfs.fontid = this.stream.GetULongLE();
					else if ( c_oSerXfsTypes.NumFmtId == type )
						oXfs.numid = this.stream.GetULongLE();
					else if ( c_oSerXfsTypes.QuotePrefix == type )
						oXfs.QuotePrefix = this.stream.GetBool();
					else if ( c_oSerXfsTypes.PivotButton == type )
						oXfs.PivotButton = this.stream.GetBool();
					else if (c_oSerXfsTypes.XfId === type)
						oXfs.XfId = this.stream.GetULongLE();
					else if ( c_oSerXfsTypes.Aligment == type )
					{
						if(null == oXfs.align)
							oXfs.align = new AscCommonExcel.Align();
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadAligment(t,l,oXfs.align);
						});
					}
					else if (c_oSerXfsTypes.ApplyProtection == type) {
						oXfs.applyProtection = this.stream.GetBool();
					}
					else if ( c_oSerXfsTypes.Protection == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadProtection(t,l,oXfs);
						});
					}
					else
						res = c_oSerConstants.ReadUnknown;
					return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("applyAlignment" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyAlignment = val;
			} else if ("applyBorder" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyBorder = val;
			} else if ("applyFill" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyFill = val;
			} else if ("applyFont" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyFont = val;
			} else if ("applyNumberFormat" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyNumberFormat = val;
			} else if ("applyProtection" === reader.GetName()) {
				val = reader.GetValueBool();
				this.ApplyProtection = val;
			} else if ("borderId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.BorderId = val;
			} else if ("fillId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.fillid = val;
			} else if ("fontId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.fontid = val;
			} else if ("numFmtId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.numid = val;
			} else if ("pivotButton" === reader.GetName()) {
				val = reader.GetValueBool();
				this.PivotButton = val;
			} else if ("quotePrefix" === reader.GetName()) {
				val = reader.GetValueBool();
				this.QuotePrefix = val;
			} else if ("xfId" === reader.GetName()) {
				val = reader.GetValueInt();
				this.XfId = val;
			}
		}
	};

	AscCommonExcel.BorderProp.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"color" == sName )
								m_oColor = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("color" === name) {
				//ReadColorSpreadsheet2 - возможно стоит объединить
				this.c = AscCommon.getColorFromXml2(reader);
			}
		}
	};

	AscCommonExcel.BorderProp.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:complexType name="CT_BorderPr">
		3479 <xsd:sequence>
		3480 <xsd:element name="color" type="CT_Color" minOccurs="0" maxOccurs="1"/>
		3481 </xsd:sequence>
		3482 <xsd:attribute name="style" type="ST_BorderStyle" use="optional" default="none"/>
		3483 </xsd:complexType>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if(oReader, L"style", m_oStyle)
							WritingElement_ReadAttributes_Read_else_if(oReader, L"ss:Color", sColor)
							WritingElement_ReadAttributes_Read_else_if(oReader, L"ss:LineStyle", sLineStyle)
							WritingElement_ReadAttributes_Read_else_if(oReader, L"ss:Position", m_oType)
							WritingElement_ReadAttributes_Read_else_if(oReader, L"ss:Weight", iWeight)*/

//serialize
		/*  var res = c_oSerConstants.ReadOk;
					var oThis = this;
					if ( c_oSerBorderPropTypes.Style == type )
					{
						switch(this.stream.GetUChar())
						{
							case EBorderStyle.borderstyleDashDot:			oBorderProp.setStyle(c_oAscBorderStyles.DashDot);break;
							case EBorderStyle.borderstyleDashDotDot:		oBorderProp.setStyle(c_oAscBorderStyles.DashDotDot);break;
							case EBorderStyle.borderstyleDashed:			oBorderProp.setStyle(c_oAscBorderStyles.Dashed);break;
							case EBorderStyle.borderstyleDotted:			oBorderProp.setStyle(c_oAscBorderStyles.Dotted);break;
							case EBorderStyle.borderstyleDouble:			oBorderProp.setStyle(c_oAscBorderStyles.Double);break;
							case EBorderStyle.borderstyleHair:				oBorderProp.setStyle(c_oAscBorderStyles.Hair);break;
							case EBorderStyle.borderstyleMedium:			oBorderProp.setStyle(c_oAscBorderStyles.Medium);break;
							case EBorderStyle.borderstyleMediumDashDot:		oBorderProp.setStyle(c_oAscBorderStyles.MediumDashDot);break;
							case EBorderStyle.borderstyleMediumDashDotDot:	oBorderProp.setStyle(c_oAscBorderStyles.MediumDashDotDot);break;
							case EBorderStyle.borderstyleMediumDashed:		oBorderProp.setStyle(c_oAscBorderStyles.MediumDashed);break;
							case EBorderStyle.borderstyleNone:				oBorderProp.setStyle(c_oAscBorderStyles.None);break;
							case EBorderStyle.borderstyleSlantDashDot:		oBorderProp.setStyle(c_oAscBorderStyles.SlantDashDot);break;
							case EBorderStyle.borderstyleThick:				oBorderProp.setStyle(c_oAscBorderStyles.Thick);break;
							case EBorderStyle.borderstyleThin:				oBorderProp.setStyle(c_oAscBorderStyles.Thin);break;
							default :										oBorderProp.setStyle(c_oAscBorderStyles.None);break;
						}
					}
					else if ( c_oSerBorderPropTypes.Color == type ) {
						oBorderProp.c = ReadColorSpreadsheet2(this.bcr, length);
					}
					else
						res = c_oSerConstants.ReadUnknown;
					return res;*/

		var toEBorderStyle = function (sValue) {

			var res = Asc.EBorderStyle.borderstyleNone;
			if ("dashDot" === sValue) {
				res = Asc.EBorderStyle.borderstyleDashDot;
			} else if ("dashDotDot" === sValue) {
				res = Asc.EBorderStyle.borderstyleDashDotDot;
			} else if ("dashed" === sValue) {
				res = Asc.EBorderStyle.borderstyleDashed;
			} else if ("dotted" === sValue) {
				res = Asc.EBorderStyle.borderstyleDotted;
			} else if ("double" === sValue) {
				res = Asc.EBorderStyle.borderstyleDouble;
			} else if ("hair" === sValue) {
				res = Asc.EBorderStyle.borderstyleHair;
			} else if ("medium" === sValue) {
				res = Asc.EBorderStyle.borderstyleMedium;
			} else if ("mediumDashDot" === sValue) {
				res = Asc.EBorderStyle.borderstyleMediumDashDot;
			} else if ("mediumDashDotDot" === sValue) {
				res = Asc.EBorderStyle.borderstyleMediumDashDotDot;
			} else if ("mediumDashed" === sValue) {
				res = Asc.EBorderStyle.borderstyleMediumDashed;
			} else if ("none" === sValue) {
				res = Asc.EBorderStyle.borderstyleNone;
			} else if ("slantDashDot" === sValue) {
				res = Asc.EBorderStyle.borderstyleSlantDashDot;
			} else if ("thick" === sValue) {
				res = Asc.EBorderStyle.borderstyleThick;
			} else if ("thin" === sValue) {
				res = Asc.EBorderStyle.borderstyleThin;
			}

			return res;
		};

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("style" === reader.GetName()) {
				val = toEBorderStyle(reader.GetValue());
				switch(val)
				{
					case Asc.EBorderStyle.borderstyleDashDot:			this.setStyle(AscCommon.c_oAscBorderStyles.DashDot);break;
					case Asc.EBorderStyle.borderstyleDashDotDot:		this.setStyle(AscCommon.c_oAscBorderStyles.DashDotDot);break;
					case Asc.EBorderStyle.borderstyleDashed:			this.setStyle(AscCommon.c_oAscBorderStyles.Dashed);break;
					case Asc.EBorderStyle.borderstyleDotted:			this.setStyle(AscCommon.c_oAscBorderStyles.Dotted);break;
					case Asc.EBorderStyle.borderstyleDouble:			this.setStyle(AscCommon.c_oAscBorderStyles.Double);break;
					case Asc.EBorderStyle.borderstyleHair:				this.setStyle(AscCommon.c_oAscBorderStyles.Hair);break;
					case Asc.EBorderStyle.borderstyleMedium:			this.setStyle(AscCommon.c_oAscBorderStyles.Medium);break;
					case Asc.EBorderStyle.borderstyleMediumDashDot:		this.setStyle(AscCommon.c_oAscBorderStyles.MediumDashDot);break;
					case Asc.EBorderStyle.borderstyleMediumDashDotDot:	this.setStyle(AscCommon.c_oAscBorderStyles.MediumDashDotDot);break;
					case Asc.EBorderStyle.borderstyleMediumDashed:		this.setStyle(AscCommon.c_oAscBorderStyles.MediumDashed);break;
					case Asc.EBorderStyle.borderstyleNone:				this.setStyle(AscCommon.c_oAscBorderStyles.None);break;
					case Asc.EBorderStyle.borderstyleSlantDashDot:		this.setStyle(AscCommon.c_oAscBorderStyles.SlantDashDot);break;
					case Asc.EBorderStyle.borderstyleThick:				this.setStyle(AscCommon.c_oAscBorderStyles.Thick);break;
					case Asc.EBorderStyle.borderstyleThin:				this.setStyle(AscCommon.c_oAscBorderStyles.Thin);break;
					default :										this.setStyle(AscCommon.c_oAscBorderStyles.None);break;
				}
			} /*else if ("ss:Color" === reader.GetName()) {
				val = reader.GetValue();

			} else if ("ss:LineStyle" === reader.GetName()) {

			}*/
		}
	};

	AscCommonExcel.Border.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( _T("bottom") == sName )
								m_oBottom = oReader;
							else if ( _T("diagonal") == sName )
								m_oDiagonal = oReader;
							else if ( _T("end") == sName || _T("right") == sName )
								m_oEnd = oReader;
							else if ( _T("horizontal") == sName )
								m_oHorizontal = oReader;
							else if ( _T("start") == sName || _T("left") == sName )
								m_oStart = oReader;
							else if ( _T("top") == sName )
								m_oTop = oReader;
							else if ( L"vertical" == sName )
								m_oVertical = oReader;
							else if (L"Border" == sName)
							{
								CBorderProp* border = new CBorderProp(oReader);
								if ((border) && (border->m_oType.IsInit()))
								{
									if (*border->m_oType == L"Bottom")		m_oBottom	= border;
									else if (*border->m_oType == L"Top")	m_oTop		= border;
									else if (*border->m_oType == L"Left")	m_oStart	= border;
									else if (*border->m_oType == L"Right")	m_oEnd		= border;

									if (border->bBorderContinuous)
										bBorderContinuous = true;
								}
								else
								{
									delete border;
								}
							}

						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode())
			return;
		var depth = reader.GetDepth();
		var borderProp;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("bottom" == name) {
				this.b.fromXml(reader);
			} else if ("diagonal" == name) {
				this.d.fromXml(reader);
			} else if ("end" == name || "right" == name) {
				this.r.fromXml(reader);
			} else if ("horizontal" == name) {
				this.ih.fromXml(reader);
			} else if ("start" == name || "left" == name) {
				this.l.fromXml(reader);
			} else if ("top" == name) {
				this.t.fromXml(reader);
			} else if ("vertical" == name) {
				this.iv.fromXml(reader);
			}
		}
	};

	AscCommonExcel.Border.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:complexType name="CT_Border">
		3465 <xsd:sequence>
		3466 <xsd:element name="start" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3467 <xsd:element name="end" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3468 <xsd:element name="top" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3469 <xsd:element name="bottom" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3470 <xsd:element name="diagonal" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3471 <xsd:element name="vertical" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3472 <xsd:element name="horizontal" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
		3473 </xsd:sequence>
		3474 <xsd:attribute name="diagonalUp" type="xsd:boolean" use="optional"/>
		3475 <xsd:attribute name="diagonalDown" type="xsd:boolean" use="optional"/>
		3476 <xsd:attribute name="outline" type="xsd:boolean" use="optional" default="true"/>
		3477 </xsd:complexType>*/

//x2t
		/*WritingElement_ReadAttributes_Start( oReader )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("diagonalDown"),	m_oDiagonalDown )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("diagonalUp"),		m_oDiagonalUp )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("outline"),			m_oOutline )
						WritingElement_ReadAttributes_End( oReader )*/

//serialize
		/*  var res = c_oSerConstants.ReadOk;
					var oThis = this;
					if ( c_oSerBorderTypes.Bottom == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.b);
						});
					}
					else if ( c_oSerBorderTypes.Diagonal == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.d);
						});
					}
					else if ( c_oSerBorderTypes.End == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.r);
						});
					}
					else if ( c_oSerBorderTypes.Horizontal == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.ih);
						});
					}
					else if ( c_oSerBorderTypes.Start == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.l);
						});
					}
					else if ( c_oSerBorderTypes.Top == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.t);
						});
					}
					else if ( c_oSerBorderTypes.Vertical == type )
					{
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadBorderProp(t,l,oNewBorder.iv);
						});
					}
					else if ( c_oSerBorderTypes.DiagonalDown == type )
					{
						oNewBorder.dd = this.stream.GetBool();
					}
					else if ( c_oSerBorderTypes.DiagonalUp == type )
					{
						oNewBorder.du = this.stream.GetBool();
					}
					// else if ( c_oSerBorderTypes.Outline == type )
					// {
					// oNewBorder.outline = this.stream.GetBool();
					// }
					else
						res = c_oSerConstants.ReadUnknown;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("diagonalDown" === reader.GetName()) {
				val = reader.GetValueBool();
				this.dd = val;
			} else if ("diagonalUp" === reader.GetName()) {
				val = reader.GetValueBool();
				this.du = val;
			} else if ("outline" === reader.GetName()) {
				val = reader.GetValueBool();
				this.outline = val;
			}
		}
	};

	AscCommonExcel.Align.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( !oReader.IsEmptyNode() )
							oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	AscCommonExcel.Align.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:complexType name="CT_CellAlignment">
		3430 <xsd:attribute name="horizontal" type="ST_HorizontalAlignment" use="optional"/>
		3431 <xsd:attribute name="vertical" type="ST_VerticalAlignment" use="optional"/>
		3432 <xsd:attribute name="textRotation" type="xsd:unsignedInt" use="optional"/>
		3433 <xsd:attribute name="wrapText" type="xsd:boolean" use="optional"/>
		3434 <xsd:attribute name="indent" type="xsd:unsignedInt" use="optional"/>Annex A
		4473
		3435 <xsd:attribute name="relativeIndent" type="xsd:int" use="optional"/>
		3436 <xsd:attribute name="justifyLastLine" type="xsd:boolean" use="optional"/>
		3437 <xsd:attribute name="shrinkToFit" type="xsd:boolean" use="optional"/>
		3438 <xsd:attribute name="readingOrder" type="xsd:unsignedInt" use="optional"/>
		3439 </xsd:complexType>*/

//x2t
		/*WritingElement_ReadAttributes_Start( oReader )
							WritingElement_ReadAttributes_Read_if( oReader, _T("horizontal"),			m_oHorizontal )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("indent"),			m_oIndent )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("justifyLastLine"),	m_oJustifyLastLine )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("readingOrder"),	m_oReadingOrder )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("relativeIndent"),	m_oRelativeIndent )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("shrinkToFit"),		m_oShrinkToFit )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("textRotation"),	m_oTextRotation )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("vertical"),		m_oVertical )
							WritingElement_ReadAttributes_Read_else_if( oReader, _T("wrapText"),		m_oWrapText )
					// 2003
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:Horizontal"),	m_oHorizontal)
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:Vertical"),		m_oVertical)
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:WrapText"),		m_oWrapText)
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:Indent"),		m_oIndent)
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:ReadingOrder"),	readingOrder)
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:Rotate"),		rotate)
							WritingElement_ReadAttributes_Read_else_if(oReader, _T("ss:ShrinkToFit"),	m_oShrinkToFit)
						WritingElement_ReadAttributes_End( oReader )*/

//serialize
		/*if ( c_oSerAligmentTypes.Horizontal == type )
					{
						switch(this.stream.GetUChar())
						{
							case 0 :
							case 1 : oAligment.hor = AscCommon.align_Center;break;
							case 2 :
							case 3 :
							case 5 : oAligment.hor = AscCommon.align_Justify;break;
							case 4 : oAligment.hor = null;break;
							case 6 : oAligment.hor = AscCommon.align_Left;break;
							case 7 : oAligment.hor = AscCommon.align_Right;break;
							case 8 : oAligment.hor = AscCommon.align_CenterContinuous;break;
						}
					}
					else if ( c_oSerAligmentTypes.Indent == type )
						oAligment.indent = this.stream.GetULongLE();
					else if ( c_oSerAligmentTypes.RelativeIndent == type )
						oAligment.RelativeIndent = this.stream.GetULongLE();
					else if ( c_oSerAligmentTypes.ShrinkToFit == type )
						oAligment.shrink = this.stream.GetBool();
					else if ( c_oSerAligmentTypes.TextRotation == type )
						oAligment.angle = this.stream.GetULongLE();
					else if ( c_oSerAligmentTypes.Vertical == type )
						oAligment.ver = this.stream.GetUChar();
					else if ( c_oSerAligmentTypes.WrapText == type )
						oAligment.wrap= this.stream.GetBool();
					else
						res = c_oSerConstants.ReadUnknown;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("horizontal" === reader.GetName() || "ss:Horizontal" === reader.GetName()) {
				val = reader.GetValue();
				this.hor = AscCommonExcel.FromXml_ST_HorizontalAlignment(val);
			} else if ("indent" === reader.GetName() || "ss:Indent" === reader.GetName()) {
				val = reader.GetValueInt();
				this.indent = val;
			} else if ("justifyLastLine" === reader.GetName()) {
				val = reader.GetValueBool();
				this.justifyLastLine = val;
			} else if ("readingOrder" === reader.GetName() || "ss:ReadingOrder" === reader.GetName()) {
				//val = reader.GetValueInt();
				//this.readingOrder = val;
			} else if ("relativeIndent" === reader.GetName()) {
				val = reader.GetValueInt();
				this.RelativeIndent = val;
			} else if ("shrinkToFit" === reader.GetName() || "ss:ShrinkToFit" === reader.GetName()) {
				val = reader.GetValueBool();
				this.shrink = val;
			} else if ("textRotation" === reader.GetName() || "ss:Rotate" === reader.GetName()) {
				val = reader.GetValueInt();
				this.angle = val;
			} else if ("vertical" === reader.GetName() || "ss:Vertical" === reader.GetName()) {
				val = reader.GetValue();
				this.ver = AscCommonExcel.FromXml_ST_VerticalAlignment(val);
			} else if ("wrapText" === reader.GetName() || "ss:WrapText" === reader.GetName()) {
				val = reader.GetValueBool();
				this.wrap = val;
			}
		}
	};

	AscCommonExcel.CellXfs.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( _T("alignment") == sName )
								m_oAlignment = oReader;
							else if ( _T("border") == sName )
								m_oBorder = oReader;
							else if ( _T("fill") == sName )
								m_oFill = oReader;
							else if ( _T("font") == sName )
								m_oFont = oReader;
							else if ( _T("numFmt") == sName )
								m_oNumFmt = oReader;
							else if ( _T("protection") == sName )
								m_oProtection = oReader;
						}*/

		//documentation
		/*<xsd:sequence>
		3654 <xsd:element name="font" type="CT_Font" minOccurs="0" maxOccurs="1"/>
		3655 <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0" maxOccurs="1"/>
		3656 <xsd:element name="fill" type="CT_Fill" minOccurs="0" maxOccurs="1"/>
		3657 <xsd:element name="alignment" type="CT_CellAlignment" minOccurs="0" maxOccurs="1"/>
		3658 <xsd:element name="border" type="CT_Border" minOccurs="0" maxOccurs="1"/>
		3659 <xsd:element name="protection" type="CT_CellProtection" minOccurs="0" maxOccurs="1"/>
		3660 <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
		3661 </xsd:sequence>*/

//x2t
		/**/

//serialize
		/* if ( c_oSer_Dxf.Alignment == type )
					{
						oDxf.align = new AscCommonExcel.Align();
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadAligment(t,l,oDxf.align);
						});
					}
					else if ( c_oSer_Dxf.Border == type )
					{
						var oNewBorder = new AscCommonExcel.Border();
						res = this.bcr.Read1(length, function(t,l){
							return oThis.ReadBorder(t,l,oNewBorder);
						});
						oDxf.border = oNewBorder;
					}
					else if ( c_oSer_Dxf.Fill == type )
					{
						var oNewFill = new AscCommonExcel.Fill();
						res = this.bcr.Read1(length, function(t,l){
							return oThis.ReadFill(t,l,oNewFill);
						});
						oNewFill.fixForDxf();
						oDxf.fill = oNewFill;
					}
					else if ( c_oSer_Dxf.Font == type )
					{
						var oNewFont = new AscCommonExcel.Font();
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.bssr.ReadRPr(t,l,oNewFont);
						});
						oNewFont.checkSchemeFont(this.wb.theme);
						oDxf.font = oNewFont;
					}
					else if ( c_oSer_Dxf.NumFmt == type )
					{
						var oNewNumFmt = {f: null, id: null};
						res = this.bcr.Read2Spreadsheet(length, function(t,l){
							return oThis.ReadNumFmt(t,l,oNewNumFmt);
						});
						if(null != oNewNumFmt.id)
							oDxf.num = this.ParseNum(oNewNumFmt, null);
					}*/

		if (reader.IsEmptyNode())
			return;

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			var val;
			if ("alignment" === name) {
				val = new AscCommonExcel.Align();
				val.fromXml(reader);
				this.align = val;
			} else if ("border" === name) {
				val = new AscCommonExcel.Border();
				val.fromXml(reader);
				this.border = val;
			} else if ("fill" === name) {
				val = new AscCommonExcel.Fill();
				val.fromXml(reader);
				val.fixForDxf();
				this.fill = val;
			} else if ("font" === name) {
				val = new AscCommonExcel.Font();
				val.fromXml(reader);
				//TODO
				if (this.wb) {
					val.checkSchemeFont(this.wb.theme);
				}
				this.font = val;
			} else if ("NumFmt" === name) {
				/*val = new AscCommonExcel.Border();
				val.fromXml(reader);
				this.border = val;*/
			}
		}
	};

	AscCommonExcel.Fill.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"gradientFill" == sName )
								m_oGradientFill = oReader;
							else if ( L"patternFill" == sName )
								m_oPatternFill = oReader;
						}*/


		/*ritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:PatternColor"), sPatternColor )
		WritingElement_ReadAttributes_Read_else_if( oReader, _T("ss:Pattern"), sPattern )
		WritingElement_ReadAttributes_Read_else_if( oReader, _T("ss:Color"), sColor )*/
		//this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		var val;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("patternFill" === name) {
				val = new AscCommonExcel.PatternFill();
				val.fromXml(reader);
				this.patternFill = val;
			} else if ("gradientFill" === name) {
				val = new AscCommonExcel.GradientFill();
				val.fromXml(reader);
				this.gradientFill = val;
			}
		}
	};

	AscCommonExcel.PatternFill.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"bgColor" == sName )
								m_oBgColor = oReader;
							else if ( L"fgColor" == sName )
								m_oFgColor = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			var val;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("bgColor" === name) {
				this.bgColor = AscCommon.getColorFromXml2(reader);
			} else if ("fgColor" === name) {
				this.fgColor = AscCommon.getColorFromXml2(reader);
			}
			//TODO PatternBgColor_deprecated ?
		}
	};

	AscCommonExcel.PatternFill.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Start( oReader )
							WritingElement_ReadAttributes_Read_if ( oReader, L"patternType", m_oPatternType )
						WritingElement_ReadAttributes_End( oReader )*/

//serialize
		/* if ( c_oSerFillTypes.PatternBgColor_deprecated == type ) {
						patternFill.fromColor(ReadColorSpreadsheet2(this.bcr, length));
					} else if ( c_oSerFillTypes.PatternType == type ) {
						patternFill.patternType = this.stream.GetUChar();
					} else if ( c_oSerFillTypes.PatternFgColor == type ) {
						patternFill.fgColor = ReadColorSpreadsheet2(this.bcr, length);
					} else if ( c_oSerFillTypes.PatternBgColor == type ) {
						patternFill.bgColor = ReadColorSpreadsheet2(this.bcr, length);
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("patternType" === reader.GetName()) {
				val = reader.GetValue();
				val = AscCommonExcel.FromXml_ST_PatternType(val);
				if (-1 !== val) {
					this.patternType = val;
				}
			}
		}
	};

	AscCommonExcel.GradientFill.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"stop" == sName )
								m_arrItems.push_back( new CGradientStop( oReader ));
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("stop" === name) {
				var val = new AscCommonExcel.GradientStop();
				val.fromXml(reader);
				this.stop.push(val);
			}
		}
	};

	AscCommonExcel.GradientFill.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:sequence>
		3545 <xsd:element name="stop" type="CT_GradientStop" minOccurs="0" maxOccurs="unbounded"/>
		3546 </xsd:sequence>
		3547 <xsd:attribute name="type" type="ST_GradientType" use="optional" default="linear"/>
		3548 <xsd:attribute name="degree" type="xsd:double" use="optional" default="0"/>
		3549 <xsd:attribute name="left" type="xsd:double" use="optional" default="0"/>
		3550 <xsd:attribute name="right" type="xsd:double" use="optional" default="0"/>
		3551 <xsd:attribute name="top" type="xsd:double" use="optional" default="0"/>
		3552 <xsd:attribute name="bottom" type="xsd:double" use="optional" default="0"/>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, L"bottom",	m_oBottom )
							WritingElement_ReadAttributes_Read_if     ( oReader, L"degree",	m_oDegree )
							WritingElement_ReadAttributes_Read_if     ( oReader, L"left",	m_oLeft )
							WritingElement_ReadAttributes_Read_if     ( oReader, L"right",	m_oRight )
							WritingElement_ReadAttributes_Read_if     ( oReader, L"top",	m_oTop )
							WritingElement_ReadAttributes_Read_if     ( oReader, L"type",	m_oType )*/

//serialize
		/*  if ( c_oSerFillTypes.GradientType == type ) {
						gradientFill.type = this.stream.GetUChar();
					} else if ( c_oSerFillTypes.GradientLeft == type ) {
						gradientFill.left = this.stream.GetDoubleLE();
					} else if ( c_oSerFillTypes.GradientTop == type ) {
						gradientFill.top = this.stream.GetDoubleLE();
					} else if ( c_oSerFillTypes.GradientRight == type ) {
						gradientFill.right = this.stream.GetDoubleLE();
					} else if ( c_oSerFillTypes.GradientBottom == type ) {
						gradientFill.bottom = this.stream.GetDoubleLE();
					} else if ( c_oSerFillTypes.GradientDegree == type ) {
						gradientFill.degree = this.stream.GetDoubleLE();
					} else if ( c_oSerFillTypes.GradientStop == type ) {
						var gradientStop = new AscCommonExcel.GradientStop();
						res = this.bcr.Read1(length, function(t, l) {
							return oThis.ReadGradientFillStop(t, l, gradientStop);
						});
						gradientFill.stop.push(gradientStop);
					}*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("bottom" === reader.GetName()) {
				val = reader.GetValue();
				this.bottom = val;
			} else if ("degree" === reader.GetName()) {
				val = reader.GetValue();
				this.degree = val;
			} else if ("left" === reader.GetName()) {
				val = reader.GetValue();
				this.left = val;
			} else if ("right" === reader.GetName()) {
				val = reader.GetValue();
				this.right = val;
			} else if ("top" === reader.GetName()) {
				val = reader.GetValue();
				this.top = val;
			} else if ("type" === reader.GetName()) {
				val = reader.GetValue();
				this.type = val;
			}
		}
	};

	AscCommonExcel.GradientStop.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"color" == sName )
								m_oColor = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("color" === name) {
				this.color = AscCommon.getColorFromXml2(reader);
			}
		}
	};

	AscCommonExcel.GradientStop.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:sequence>
		3556 <xsd:element name="color" type="CT_Color" minOccurs="1" maxOccurs="1"/>
		3557 </xsd:sequence>
		3558 <xsd:attribute name="position" type="xsd:double" use="required"/>*/

//x2t
		/*ritingElement_ReadAttributes_Start( oReader )
							WritingElement_ReadAttributes_Read_if ( oReader, L"position", m_oPosition )
						WritingElement_ReadAttributes_End( oReader )*/

//serialize
		/*  if ( c_oSerFillTypes.GradientStopPosition == type ) {
						gradientStop.position = this.stream.GetDoubleLE();
					} else if ( c_oSerFillTypes.GradientStopColor == type ) {
						gradientStop.color = ReadColorSpreadsheet2(this.bcr, length);
					} else
						res = c_oSerConstants.ReadUnknown;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("position" === reader.GetName()) {
				val = reader.GetValue();
				this.position = val;
			}
		}
	};

	AscCommonExcel.Font.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"b" == sName )
								m_oBold = oReader;
							else if ( L"charset" == sName )
								m_oCharset = oReader;
							else if ( L"color" == sName )
								m_oColor = oReader;
							else if ( L"condense" == sName )
								m_oCondense = oReader;
							else if ( L"extend" == sName )
								m_oExtend = oReader;
							else if ( L"family" == sName )
								m_oFamily = oReader;
							else if ( L"i" == sName )
								m_oItalic = oReader;
							else if ( L"name" == sName )
								m_oRFont = oReader;
							else if ( L"outline" == sName )
								m_oOutline = oReader;
							else if ( L"scheme" == sName )
								m_oScheme = oReader;
							else if ( L"shadow" == sName )
								m_oShadow = oReader;
							else if ( L"strike" == sName )
								m_oStrike = oReader;
							else if ( L"sz" == sName )
								m_oSz = oReader;
							else if ( L"u" == sName )
								m_oUnderline = oReader;
							else if ( L"vertAlign" == sName )
								m_oVertAlign = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("b" === name) {
				this.b = reader.GetValueBool();
			} else if ("charset" === name) {
			} else if ("color" === name) {
				this.c = AscCommon.getColorFromXml2(reader);
			} else if ("condense" === name) {
			} else if ("extend" === name) {
			} else if ("family" === name) {
			} else if ("i" === name) {
				this.i = reader.GetValueBool();
			} else if ("name" === name) {
			} else if ("outline" === name) {
			} else if ("scheme" === name) {
				this.scheme = reader.GetValue();
			} else if ("shadow" === name) {
			} else if ("strike" === name) {
				this.s = reader.GetValueBool();
			} else if ("sz" === name) {
				this.fs = reader.GetValueInt();
			} else if ("u" === name) {
				this.u = reader.GetValueBool();
			} else if ("vertAlign" === name) {
				//TODO
				this.va = reader.GetValue();
				//server constants SubScript:1, SuperScript: 2
				if (this.va === AscCommon.vertalign_SubScript) {
					this.va = AscCommon.vertalign_SuperScript;
				} else if (this.va === AscCommon.vertalign_SuperScript) {
					this.va = AscCommon.vertalign_SubScript;
				}
			}
		}
	};

	AscCommonExcel.Font.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:choice maxOccurs="unbounded">
		3794 <xsd:element name="name" type="CT_FontName" minOccurs="0" maxOccurs="1"/>
		3795 <xsd:element name="charset" type="CT_IntProperty" minOccurs="0" maxOccurs="1"/>
		3796 <xsd:element name="family" type="CT_IntProperty" minOccurs="0" maxOccurs="1"/>
		3797 <xsd:element name="b" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3798 <xsd:element name="i" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3799 <xsd:element name="strike" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3800 <xsd:element name="outline" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3801 <xsd:element name="shadow" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3802 <xsd:element name="condense" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3803 <xsd:element name="extend" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
		3804 <xsd:element name="color" type="CT_Color" minOccurs="0" maxOccurs="1"/>
		3805 <xsd:element name="sz" type="CT_FontSize" minOccurs="0" maxOccurs="1"/>ECMA-376 Part 1
		4480
		3806 <xsd:element name="u" type="CT_UnderlineProperty" minOccurs="0" maxOccurs="1"/>
		3807 <xsd:element name="vertAlign" type="CT_VerticalAlignFontProperty" minOccurs="0"
		3808 maxOccurs="1"/>
		3809 <xsd:element name="scheme" type="CT_FontScheme" minOccurs="0" maxOccurs="1"/>
		3810 </xsd:choice>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:FontName"),	sFont )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("x:Family"),	oFamily )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("x:CharSet"),	oCharset )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:Size"),		dSz )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:Color"),	sColor )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:Underline"),oUnderline )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:Bold"),		bBold )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:Italic"),	bItalic )
							WritingElement_ReadAttributes_Read_if     ( oReader, _T("ss:Italic"),	bItalic )
							WritingElement_ReadAttributes_Read_if(oReader, _T("ss:VerticalAlign"), oVerticalAlignment)*/

//serialize
		/*   var res = c_oSerConstants.ReadOk;
            var oThis = this;
            if ( c_oSerFontTypes.Bold == type )
                rPr.b = this.stream.GetBool();
            else if ( c_oSerFontTypes.Color == type ){
				var color = ReadColorSpreadsheet2(this.bcr, length);
				if (color) {
					rPr.c = color;
				}
			} else if ( c_oSerFontTypes.Italic == type )
                rPr.i = this.stream.GetBool();
            else if ( c_oSerFontTypes.RFont == type )
                rPr.fn = this.stream.GetString2LE(length);
            else if ( c_oSerFontTypes.Strike == type )
                rPr.s = this.stream.GetBool();
            else if ( c_oSerFontTypes.Sz == type )
                rPr.fs = this.stream.GetDoubleLE();
            else if ( c_oSerFontTypes.Underline == type )
                rPr.u = this.stream.GetUChar();
            else if ( c_oSerFontTypes.VertAlign == type )
            {
                rPr.va = this.stream.GetUChar();
                //server constants SubScript:1, SuperScript: 2
                if (rPr.va === AscCommon.vertalign_SubScript) {
                    rPr.va = AscCommon.vertalign_SuperScript;
                } else if (rPr.va === AscCommon.vertalign_SuperScript) {
                    rPr.va = AscCommon.vertalign_SubScript;
                }
            }
            else if ( c_oSerFontTypes.Scheme == type )
                rPr.scheme = this.stream.GetUChar();
            else
                res = c_oSerConstants.ReadUnknown;
            return res;*/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("ss:FontName" === reader.GetName()) {
			} else if ("x:Family" === reader.GetName()) {
			} else if ("x:CharSet" === reader.GetName()) {
			} else if ("ss:Size" === reader.GetName()) {
			} else if ("ss:Color" === reader.GetName()) {
			} else if ("ss:Underline" === reader.GetName()) {
			} else if ("ss:Bold" === reader.GetName()) {
			} else if ("ss:Italic" === reader.GetName()) {
			} else if ("ss:Italic" === reader.GetName()) {
			} else if ("ss:VerticalAlign" === reader.GetName()) {
			}
		}
	};


	//***External Reference****
	function CT_ExternalReference() {
		this.val = null;
	}
	CT_ExternalReference.prototype.fromXml = function (reader) {

		/*m_oReadPath = oPath;
						IFileContainer::Read( oRootPath, oPath );

						XmlUtils::CXmlLiteReader oReader;

						if ( !oReader.FromFile( oPath.GetPath() ) )
							return;

						if ( !oReader.ReadNextNode() )
							return;

						std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());
						if ( (L"externalLink") == sName )
						{
							ReadAttributes( oReader );

							if ( !oReader.IsEmptyNode() )
							{
								int nStylesDepth = oReader.GetDepth();
								while ( oReader.ReadNextSiblingNode( nStylesDepth ) )
								{
									sName = XmlUtils::GetNameNoNS(oReader.GetName());

									if ( (L"externalBook") == sName )
									{
										m_oExternalBook = oReader;
									}
									else if ( (L"oleLink") == sName )
									{
										m_oOleLink = oReader;
									}
									else if ( (L"ddeLink") == sName )
									{
										m_oDdeLink = oReader;
									}
								}
							}
						}		*/

		//не далаю отдельных классов для externalLink/externalBook

		if (reader.IsEmptyNode()) {
			return;
		}
		var val;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("externalLink" === name) {

				if (reader.IsEmptyNode()) {
					return;
				}

				var depth2 = reader.GetDepth();
				while (reader.ReadNextSiblingNode(depth2)) {
					var name2 = reader.GetNameNoNS();
					if ("externalBook" === name2) {

						var externalBook = {Type: 0, Id: null, SheetNames: [], DefinedNames: [], SheetDataSet: []};

						while (reader.MoveToNextAttribute()) {
							if ("id" === reader.GetNameNoNS()) {
								externalBook.Id = reader.GetValue();
							}
						}

						if (reader.IsEmptyNode()) {
							continue;
						}
						var depth3 = reader.GetDepth();
						while (reader.ReadNextSiblingNode(depth3)) {
							var name3 = reader.GetNameNoNS();
							if ("sheetNames" === name3) {
								val = new CT_ExternalSheetNames();
								val.fromXml(reader);
								if (val.val) {
									externalBook.SheetNames = val.val;
								}
							} else if ("definedNames" === name3) {
								val = new CT_ExternalDefinedNames();
								val.fromXml(reader);
								if (val.val) {
									externalBook.DefinedNames = val.val;
								}
							} else if ("sheetDataSet" === name3) {
								val = new CT_ExternalSheetDataSet();
								val.fromXml(reader);
								if (val.val) {
									externalBook.SheetDataSet = val.val;
								}
							}
						}

						this.val = externalBook;
					} else if ("oleLink" === name) {
						//TODO
						//хранится в бинарном виде
						//this.oWorkbook.externalReferences.push({Type: 1, Buffer: this.stream.GetBuffer(length)});
					} else if ("ddeLink" === name) {
						//TODO
						//хранится в бинарном виде
						//this.oWorkbook.externalReferences.push({Type: 2, Buffer: this.stream.GetBuffer(length)});
					}
				}
			}
		}
	};

	function CT_ExternalSheetNames() {
		this.val = null;
	}
	CT_ExternalSheetNames.prototype.fromXml = function (reader) {

		/*if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = oReader.GetName();
							if (L"sheetName" == sName)
							{
								m_arrItems.push_back(new ComplexTypes::Spreadsheet::String(oReader));
							}
						}*/

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("sheetName" === name) {
				while (reader.MoveToNextAttribute()) {
					if ("val" === reader.GetNameNoNS()) {
						if (!this.val) {
							this.val = [];
						}
						this.val.push(reader.GetValue());
					}
				}
			}
		}
	};

	function CT_ExternalDefinedNames() {
		this.val = null;
	}
	CT_ExternalDefinedNames.prototype.fromXml = function (reader) {

		/*if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = oReader.GetName();
							if (L"definedName" == sName)
							{
								m_arrItems.push_back(new CExternalDefinedName(oReader));
							}
						}*/

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		var val;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("definedName" == name) {
				var definedName = {Name: null, RefersTo: null, SheetId: null};
				while (reader.MoveToNextAttribute()) {
					if ("name" === reader.GetName()) {
						val = reader.GetValue();
						definedName.Name = val;
					} else if ("refersTo" === reader.GetName()) {
						val = reader.GetValue();
						definedName.RefersTo = val;
					} else if ("sheetId" === reader.GetName()) {
						val = reader.GetValue();
						definedName.SheetId = val;
					}
				}
				if (!this.val) {
					this.val = [];
				}
				this.val.push(definedName);
			}
		}
	};

	function CT_ExternalSheetDataSet() {
		this.val = null;
	}
	CT_ExternalSheetDataSet.prototype.fromXml = function (reader) {
		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		var val;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("sheetData" === name) {
				val = new CT_ExternalSheetData();
				val.fromXml(reader);
				if (val.val) {
					if (!this.val) {
						this.val = [];
					}

					this.val.push(val.val);
				}
			}
		}
	}

	function CT_ExternalSheetData() {
		this.val = {SheetId: null, RefreshError: null, Row: []};
	}
	CT_ExternalSheetData.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			if ("row" === reader.GetName()) {
				var val = new CT_ExternalRow();
				val.fromXml(reader);
				if (val.val) {
					this.val.Row.push(val.val);
				}
			}
		}
	}

	CT_ExternalSheetData.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {

			if ("refersTo" === reader.GetName()) {
				val = reader.GetValue();
				this.val.RefersTo = val;
			} else if ("sheetId" === reader.GetName()) {
				val = reader.GetValue();
				this.val.SheetId = val;
			}
		}
	};


	function CT_ExternalRow() {
		this.val = {R: null, Cell: []};
	}
	CT_ExternalRow.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			if ("cell" === reader.GetName()) {
				var row = {R: null, Cell: []};

				var val = new CT_ExternalCell();
				val.fromXml(reader);
				if (val.val) {
					this.val.Cell.push(val.val);
				}
			}
		}
	}
	CT_ExternalRow.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {

			if ("r" === reader.GetName()) {
				val = reader.GetValue();
				this.val.R = val;
			}
		}
	};

	function CT_ExternalCell() {
		this.val = {Ref: null, CellType: null, CellValue: null};
	}
	CT_ExternalCell.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			if ("v" === reader.GetName()) {
				var val = reader.GetValue();
				this.val.CellValue = val;
			}
		}
	}
	CT_ExternalCell.prototype.readAttr = function(reader) {
		var val;
		while (reader.MoveToNextAttribute()) {

			if ("r" === reader.GetName()) {
				val = reader.GetValue();
				this.val.Ref = val;
			} else if ("t" === reader.GetName()) {
				val = reader.GetValue();
				this.val.CellType = val;
			}  else if ("vm" === reader.GetName()) {
				/*val = reader.GetValue();
				this.val.CellType = val;*/
			}
		}
	};


	//****Slicer cache****
	Asc.CT_slicerCacheDefinition.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("pivotTables", sName) == 0)
				{
					int nCurDepth = oReader.GetDepth();
					while (oReader.ReadNextSiblingNode(nCurDepth))
					{
						const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
						if (strcmp("pivotTable", sName) == 0)
						{
							m_oPivotTables.emplace_back();
							m_oPivotTables.back() = oReader;
						}
					}
				}
				else if (strcmp("data", sName) == 0)
					m_oData = oReader;
				else if (strcmp("extLst", sName) == 0)
					m_oExtLst = oReader;
			}*/


		if (!reader.ReadNextNode()) {
			return;
		}

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		var val;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("pivotTables" === name) {
				var depth2 = reader.GetDepth();
				while (reader.ReadNextSiblingNode(depth2)) {
					var name2 = reader.GetNameNoNS();
					if ("pivotTable" === name2) {
						val = new Asc.CT_slicerCachePivotTable();
						val.fromXml(reader);
						this.pivotTables.push(val);
					}
				}
			} else if ("data" === name) {
				val = new Asc.CT_slicerCacheData();
				val.fromXml(reader);
				this.data = val;
			} else if ("extLst" === name) {
				var extLst = new COfficeArtExtensionList(this);
				extLst.fromXml(reader);
				this.extLst = extLst.arrExt;
			}
		}

		//TODO tableSlicerCache from extLst
		//CT_tableSlicerCache.prototype.initPostOpen
		this.parseExtLst();
	};

	Asc.CT_slicerCacheDefinition.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*	WritingElement_ReadAttributes_Read_ifChar( oReader, "name", m_oName)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "uid", m_oUid)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "sourceName", m_oSourceName)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.name = val;
			} /*else if ("uid" === reader.GetNameNoNS()) {
				val = reader.GetValue();
				this.uid = val;
			}*/ else if ("sourceName" === reader.GetName()) {
				val = reader.GetValue();
				this.sourceName = val;
			}
		}
	};

	Asc.CT_slicerCacheDefinition.prototype.parseExtLst = function () {
		if (this.extLst) {
			for (var i = 0; i < this.extLst.length; i++) {
				var tableSlicerCaches = this.extLst[i].tableSlicerCaches;
				if (tableSlicerCaches) {
					for (var j = 0; j < tableSlicerCaches.length; j++) {
						this.tableSlicerCache = tableSlicerCaches[j];
					}
				}
			}
			this.extLst = null;
		}
	};

	Asc.CT_slicerCachePivotTable.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.CT_slicerCachePivotTable.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "tabId", m_oTabId)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "name", m_oName)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("tabId" === reader.GetName()) {
				val = reader.GetValue();
				this.tabIdOpen = val;
			} else if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.name = val;
			}
			//TODO sheetId ?
		}
	};


	Asc.CT_slicerCacheData.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("olap", sName) == 0)
					m_oOlap = oReader;
				else if (strcmp("tabular", sName) == 0)
					m_oTabular = oReader;
			}*/

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		var val;
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			/*this.olap = null;//OlapSlicerCache
			this.tabular = null;//TabularSlicerCache*/

			if ("olap" === name) {
				val = new Asc.CT_olapSlicerCache();
				val.fromXml(reader);
				this.olap = val;
			} else if ("tabular" === name) {
				val = new Asc.CT_tabularSlicerCache();
				val.fromXml(reader);
				this.tabular = val;
			}
		}
	};

	Asc.CT_olapSlicerCache.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("levels", sName) == 0)
					m_oLevels = oReader;
				else if (strcmp("selections", sName) == 0)
					m_oSelections = oReader;
		//		else if (strcmp("extLst", sName) == 0)
		//			m_oExtLst = oReader;
			}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode())
			return;

		var depth2, name2;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			/*this.levels = [];//OlapSlicerCacheLevelData
			this.selections = [];//OlapSlicerCacheSelection
			this.pivotCacheId = null;
			this.pivotCacheDefinition = null;*/

			if ("levels" === name) {
				depth2 = reader.GetDepth();
				while (reader.ReadNextSiblingNode(depth2)) {
					name2 = reader.GetNameNoNS();
					if ("level" === name2) {
						val = Asc.CT_olapSlicerCacheLevelData();
						val.fromXml(reader);
						this.levels.push(val);
					}
				}
			} else if ("selections" === name) {
				depth2 = reader.GetDepth();
				while (reader.ReadNextSiblingNode(depth2)) {
					name2 = reader.GetNameNoNS();
					if ("level" === name2) {
						val = Asc.CT_olapSlicerCacheSelection();
						val.fromXml(reader);
						this.selections.push(val);
					}
				}
			}
		}
	};

	Asc.CT_olapSlicerCache.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "pivotCacheId", m_oPivotCacheId)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("pivotCacheId" === reader.GetName()) {
				val = reader.GetValue();
				this.pivotCacheId = val;
			}
		}
	};

	Asc.CT_olapSlicerCacheLevelData.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("ranges", sName) == 0)
				{
					int nCurDepth = oReader.GetDepth();
					while (oReader.ReadNextSiblingNode(nCurDepth))
					{
						const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
						if (strcmp("range", sName) == 0)
						{
							m_oRanges.emplace_back();
							m_oRanges.back() = oReader;
						}
					}
				}
			}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("ranges" === name) {
				var depth2 = reader.GetDepth();
				while (reader.ReadNextSiblingNode(depth2)) {
					var name2 = reader.GetNameNoNS();
					if ("range" === name2) {
						var val = Asc.CT_olapSlicerCacheRange();
						val.fromXml(reader);
						this.ranges.push(val);
					}
				}
			}
		}
	};

	Asc.CT_olapSlicerCacheLevelData.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "uniqueName", m_oUniqueName)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "sourceCaption", m_oSourceCaption)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "count", m_oCount)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "sortOrder", m_oSortOrder)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "crossFilter", m_oCrossFilter)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("uniqueName" === reader.GetName()) {
				val = reader.GetValue();
				this.uniqueName = val;
			} else if ("sourceCaption" === reader.GetName()) {
				val = reader.GetValue();
				this.sourceCaption = val;
			} else if ("count" === reader.GetName()) {
				val = reader.GetValue();
				this.count = val;
			} else if ("sortOrder" === reader.GetName()) {
				val = reader.GetValue();
				this.sortOrder = val;
			} else if ("crossFilter" === reader.GetName()) {
				val = reader.GetValue();
				this.crossFilter = val;
			}
		}
	};

	Asc.CT_olapSlicerCacheRange.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("i", sName) == 0)
				{
					m_oI.emplace_back();
					m_oI.back() = oReader;
				}
			}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode())
			return;
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			/*this.i = [];//OlapSlicerCacheItem
			this.startItem = null*/

			if ("i" === name) {
				var val = Asc.CT_olapSlicerCacheItem();
				val.fromXml(reader);
				this.i.push(val);
			}
		}
	};

	Asc.CT_olapSlicerCacheRange.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "startItem", m_oStartItem)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("startItem" === reader.GetName()) {
				val = reader.GetValue();
				this.startItem = val;
			}
		}
	};

	Asc.CT_olapSlicerCacheItem.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("p", sName) == 0)
				{
					m_oP.emplace_back();
					m_oP.back() = oReader;
				}
			}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			/*this.p = [];//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
			this.n = null;
			this.c = null;
			this.nd = false;*/

			if ("p" === name) {
				while (reader.MoveToNextAttribute()) {
					if ("n" === reader.GetName()) {
						this.p.push(reader.GetValue());
					}
				}
			}
		}
	};

	Asc.CT_olapSlicerCacheItem.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*	WritingElement_ReadAttributes_Read_ifChar( oReader, "n", m_oN)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "c", m_oC)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "nd", m_oNd)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("n" === reader.GetName()) {
				val = reader.GetValue();
				this.n = val;
			} else if ("c" === reader.GetName()) {
				val = reader.GetValue();
				this.c = val;
			} else if ("nd" === reader.GetName()) {
				val = reader.GetValue();
				this.nd = val;
			}
		}
	};

	//CT_olapSlicerCacheSelection

	Asc.CT_olapSlicerCacheSelection.prototype.fromXml = function (reader) {
		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			/*this.p = [];//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
		this.n = null;*/

			if ("p" === name) {
				while (reader.MoveToNextAttribute()) {
					if ("n" === reader.GetNameNoNS()) {
						this.p.push(reader.getValue());
					}
				}
			}
		}
	};

	Asc.CT_olapSlicerCacheSelection.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*	WritingElement_ReadAttributes_Read_ifChar( oReader, "n", m_oN)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "c", m_oC)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "nd", m_oNd)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("n" === reader.GetName()) {
				val = reader.GetValue();
				this.n = val;
			}
		}
	};

	Asc.CT_tabularSlicerCache.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("items", sName) == 0)
					m_oItems = oReader;
				else if (strcmp("extLst", sName) == 0)
					m_oExtLst = oReader;
			}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			if ("items" === name) {
				var depth2 = reader.GetDepth();
				while (reader.ReadNextSiblingNode(depth2)) {
					var name2 = reader.GetNameNoNS();
					if ("i" === name2) {
						//CTabularSlicerCacheItem
						var val = new Asc.CT_tabularSlicerCacheItem();
						val.fromXml(reader);
						this.items.push(val);
					}
				}
			} else if ("extLst" === name) {
				//TODO
			}
		}
	};

	Asc.CT_tabularSlicerCache.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "pivotCacheId", m_oPivotCacheId)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "sortOrder", m_oSortOrder)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "customListSort", m_oCustomListSort)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "showMissing", m_oShowMissing)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "crossFilter", m_oCrossFilter)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("pivotCacheId" === reader.GetName()) {
				val = reader.GetValue();
				this.pivotCacheId = val;
			} else if ("sortOrder" === reader.GetName()) {
				val = reader.GetValue();
				this.sortOrder = val;
			} else if ("customListSort" === reader.GetName()) {
				val = reader.GetValue();
				this.customListSort = val;
			} else if ("showMissing" === reader.GetName()) {
				val = reader.GetValue();
				this.showMissing = val;
			} else if ("crossFilter" === reader.GetName()) {
				val = reader.GetValue();
				this.crossFilter = val;
			}
		}
	};

	Asc.CT_tabularSlicerCacheItem.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			oReader.ReadTillEnd();*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			reader.ReadTillEnd();
		}
	};

	Asc.CT_tabularSlicerCacheItem.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "x", m_oX)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "s", m_oS)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "nd", m_oNd)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("x" === reader.GetName()) {
				val = reader.GetValue();
				this.x = val;
			} else if ("s" === reader.GetName()) {
				val = reader.GetValue();
				this.s = val;
			} else if ("nd" === reader.GetName()) {
				val = reader.GetValue();
				this.nd = val;
			}
		}
	};

	Asc.CT_tableSlicerCache.prototype.fromXml = function (reader) {

		/*ReadAttributes(oReader);
			if (oReader.IsEmptyNode())
				return;
			int nCurDepth = oReader.GetDepth();
			while (oReader.ReadNextSiblingNode(nCurDepth))
			{
				const char* sName = XmlUtils::GetNameNoNS(oReader.GetNameChar());
				if (strcmp("extLst", sName) == 0)
					m_oExtLst = oReader;
			}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();

			/*this.tableId = null;
			this.tableIdOpen = null;//?
			this.column = null;
			this.columnOpen = null;//?
			this.sortOrder = ST_tabularSlicerCacheSortOrder.Ascending;
			this.customListSort = true;
			this.crossFilter = ST_slicerCacheCrossFilter.ShowItemsWithDataAtTop;*/

			if ("extLst" === name) {
				//TODO
			}
		}
	};

	Asc.CT_tableSlicerCache.prototype.readAttr = function (reader) {

//documentation
		/**/

//x2t
		/*WritingElement_ReadAttributes_Read_ifChar( oReader, "tableId", m_oTableId)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "column", m_oColumn)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "sortOrder", m_oSortOrder)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "customListSort", m_oCustomListSort)
					WritingElement_ReadAttributes_Read_else_ifChar( oReader, "crossFilter", m_oCrossFilter)*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("tableId" === reader.GetName()) {
				val = reader.GetValue();
				this.tableId = val;
			} else if ("column" === reader.GetName()) {
				val = reader.GetValue();
				this.column = val;
			} else if ("sortOrder" === reader.GetName()) {
				//TODO ST_tabularSlicerCacheSortOrder.Ascending;
				val = reader.GetValue();
				this.sortOrder = val;
			} else if ("customListSort" === reader.GetName()) {
				val = reader.GetValue();
				this.customListSort = val;
			} else if ("crossFilter" === reader.GetName()) {
				//TODO ST_slicerCacheCrossFilter.ShowItemsWithDataAtTop;
				val = reader.GetValue();
				this.crossFilter = val;
			}
		}
	};


	//пока читаю в строку connections. в serialize сейчас аналогично не парсим структуру, а храним в виде массива байтов
	//connections
	function CT_Connections() {
		//Members
		this.val = [];
	}

	CT_Connections.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"connection" == sName )
							{
								CConnection *pConn = new CConnection(oReader);
								m_arrItems.push_back(pConn);
							}
						}*/

		//count
		//this.readAttr(reader);

		if (!reader.ReadNextNode()) {
			return;
		}
		if (reader.IsEmptyNode()) {
			return;
		}

		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("connection" === name) {
				var connection = new AscCommonExcel.CT_Connection();
				connection.fromXml(reader);
				this.val.push(connection);
			}
		}
	};

	AscCommonExcel.CT_Connection.prototype.fromXml = function (reader) {

		/*ReadAttributes( oReader );

						if ( oReader.IsEmptyNode() )
							return;

						int nCurDepth = oReader.GetDepth();
						while( oReader.ReadNextSiblingNode( nCurDepth ) )
						{
							std::wstring sName = XmlUtils::GetNameNoNS(oReader.GetName());

							if ( L"dbPr" == sName )
								m_oDbPr = oReader;
							else if ( L"olapPr" == sName )
								m_oOlapPr = oReader;
							else if ( L"textPr" == sName )
								m_oTextPr = oReader;
							else if ( L"webPr" == sName )
								m_oWebPr = oReader;
							else if (L"rangePr" == sName) //x15
								m_oRangePr = oReader;
							else if (L"extLst" == sName)
								m_oExtLst = oReader;
						}*/

		this.readAttr(reader);

		if (reader.IsEmptyNode()) {
			return;
		}
		var depth = reader.GetDepth();
		while (reader.ReadNextSiblingNode(depth)) {
			var name = reader.GetNameNoNS();
			if ("dbPr" === name) {

			} else if ("olapPr" === name) {

			} else if ("textPr" === name) {

			} else if ("webPr" === name) {

			} else if ("rangePr" === name) {

			} else if ("extLst" === name) {

			}
		}
	};

	AscCommonExcel.CT_Connection.prototype.readAttr = function (reader) {

//documentation
		/*<xsd:complexType name="CT_Connection">
		379 <xsd:sequence>
		380 <xsd:element name="dbPr" minOccurs="0" maxOccurs="1" type="CT_DbPr"/>
		381 <xsd:element name="olapPr" minOccurs="0" maxOccurs="1" type="CT_OlapPr"/>
		382 <xsd:element name="webPr" minOccurs="0" maxOccurs="1" type="CT_WebPr"/>
		383 <xsd:element name="textPr" minOccurs="0" maxOccurs="1" type="CT_TextPr"/>
		384 <xsd:element name="parameters" minOccurs="0" maxOccurs="1" type="CT_Parameters"/>
		385 <xsd:element name="extLst" minOccurs="0" maxOccurs="1" type="CT_ExtensionList"/>
		386 </xsd:sequence>
		387 <xsd:attribute name="id" use="required" type="xsd:unsignedInt"/>
		388 <xsd:attribute name="sourceFile" use="optional" type="s:ST_Xstring"/>
		389 <xsd:attribute name="odcFile" use="optional" type="s:ST_Xstring"/>
		390 <xsd:attribute name="keepAlive" use="optional" type="xsd:boolean" default="false"/>
		391 <xsd:attribute name="interval" use="optional" type="xsd:unsignedInt" default="0"/>
		392 <xsd:attribute name="name" use="optional" type="s:ST_Xstring"/>
		393 <xsd:attribute name="description" use="optional" type="s:ST_Xstring"/>
		394 <xsd:attribute name="type" use="optional" type="xsd:unsignedInt"/>
		395 <xsd:attribute name="reconnectionMethod" use="optional" type="xsd:unsignedInt" default="1"/>
		396 <xsd:attribute name="refreshedVersion" use="required" type="xsd:unsignedByte"/>
		397 <xsd:attribute name="minRefreshableVersion" use="optional" type="xsd:unsignedByte"
		398 default="0"/>
		399 <xsd:attribute name="savePassword" use="optional" type="xsd:boolean" default="false"/>
		400 <xsd:attribute name="new" use="optional" type="xsd:boolean" default="false"/>
		401 <xsd:attribute name="deleted" use="optional" type="xsd:boolean" default="false"/>
		402 <xsd:attribute name="onlyUseConnectionFile" use="optional" type="xsd:boolean"
		403 default="false"/>
		404 <xsd:attribute name="background" use="optional" type="xsd:boolean" default="false"/>
		405 <xsd:attribute name="refreshOnLoad" use="optional" type="xsd:boolean" default="false"/>
		406 <xsd:attribute name="saveData" use="optional" type="xsd:boolean" default="false"/>
		407 <xsd:attribute name="credentials" use="optional" type="ST_CredMethod" default="integrated"/>
		408 <xsd:attribute name="singleSignOnId" use="optional" type="s:ST_Xstring"/>
		409 </xsd:complexType>*/

//x2t
		/*WritingElement_ReadAttributes_Read_if		( oReader, L"type",	m_oType )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"name",	m_oName )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"id",	m_oIdExt )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"background",	m_oBackground )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"credentials",	m_oCredentials )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"deleted",		m_oDeleted )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"description",	m_oDescription )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"interval",		m_oInterval )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"keepAlive",	m_oKeepAlive )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"minRefreshableVersion", m_oMinRefreshableVersion )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"new", m_oNew )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"odcFile", m_oOdcFile )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"onlyUseConnectionFile", m_oOnlyUseConnectionFile )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"reconnectionMethod", m_oReconnectionMethod )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"refreshedVersion", m_oRefreshedVersion )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"refreshOnLoad", m_oRefreshOnLoad )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"saveData", m_oSaveData )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"savePassword", m_oSavePassword )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"singleSignOnId", m_oSingleSignOnId )
							WritingElement_ReadAttributes_Read_else_if	( oReader, L"sourceFile", m_oSourceFile )*/

//serialize
		/**/

		var val;
		while (reader.MoveToNextAttribute()) {
			if ("type" === reader.GetName()) {
				val = reader.GetValueInt();
				this.type = val;
			} else if ("name" === reader.GetName()) {
				val = reader.GetValue();
				this.name = val;
			} else if ("id" === reader.GetName()) {
				val = reader.GetValueInt();
				this.id = val;
			} else if ("background" === reader.GetName()) {
				val = reader.GetValueBool();
				this.background = val;
			} else if ("credentials" === reader.GetName()) {
				val = reader.GetValue();
				this.credentials = val;
			} else if ("deleted" === reader.GetName()) {
				val = reader.GetValueBool();
				this.deleted = val;
			} else if ("description" === reader.GetName()) {
				val = reader.GetValue();
				this.description = val;
			} else if ("interval" === reader.GetName()) {
				val = reader.GetValueInt();
				this.interval = val;
			} else if ("keepAlive" === reader.GetName()) {
				val = reader.GetValueBool();
				this.keepAlive = val;
			} else if ("minRefreshableVersion" === reader.GetName()) {
				val = reader.GetValue();
				this.minRefreshableVersion = val;
			} else if ("new" === reader.GetName()) {
				val = reader.GetValueBool();
				this.new = val;
			} else if ("odcFile" === reader.GetName()) {
				val = reader.GetValue();
				this.odcFile = val;
			} else if ("onlyUseConnectionFile" === reader.GetName()) {
				val = reader.GetValueBool();
				this.onlyUseConnectionFile = val;
			} else if ("reconnectionMethod" === reader.GetName()) {
				val = reader.GetValueInt();
				this.reconnectionMethod = val;
			} else if ("refreshedVersion" === reader.GetName()) {
				val = reader.GetValue();
				this.refreshedVersion = val;
			} else if ("refreshOnLoad" === reader.GetName()) {
				val = reader.GetValueBool();
				this.refreshOnLoad = val;
			} else if ("saveData" === reader.GetName()) {
				val = reader.GetValueBool();
				this.saveData = val;
			} else if ("savePassword" === reader.GetName()) {
				val = reader.GetValueBool();
				this.savePassword = val;
			} else if ("singleSignOnId" === reader.GetName()) {
				val = reader.GetValue();
				this.singleSignOnId = val;
			} else if ("sourceFile" === reader.GetName()) {
				val = reader.GetValue();
				this.sourceFile = val;
			}
		}
	};


	var _x2tFromXml = 'ReadAttributes( oReader );\n' + '\n' + '\t\t\t\tif ( !oReader.IsEmptyNode() )\n' + '\t\t\t\t\toReader.ReadTillEnd();';
	var _x2t = 'WritingElement_ReadAttributes_Read_if\t\t( oReader, (L"password"),\t\tm_oPassword)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"algorithmName"),\tm_oAlgorithmName)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"hashValue"),\t\tm_oHashValue)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"saltValue"),\t\tm_oSaltValue)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"spinCount"),\t\tm_oSpinCount)\n' + '\t\t\t\t\t\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"autoFilter"),\tm_oAutoFilter)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"content"),\t\tm_oContent)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"deleteColumns"),\tm_oDeleteColumns)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"deleteRows"),\tm_oDeleteRows)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"formatCells"),\tm_oFormatCells)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"formatColumns"),\tm_oFormatColumns)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"formatRows"),\tm_oFormatRows)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"insertColumns"),\tm_oInsertColumns)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"insertHyperlinks"),m_oInsertHyperlinks)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"insertRows"),\tm_oInsertRows)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"objects"),\t\tm_oObjects)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"pivotTables"),\tm_oPivotTables)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"scenarios"),\t\tm_oScenarios)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"selectLockedCells"),m_oSelectLockedCells)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"selectUnlockedCells"),m_oSelectUnlockedCells)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"sheet"),\t\t\tm_oSheet)\n' +
		'\t\t\t\t\tWritingElement_ReadAttributes_Read_else_if\t( oReader, (L"sort"),\t\t\tm_oSort)'
	var _documentation = '<xsd:attribute name="algorithmName" type="s:ST_Xstring" use="optional"/>\n' +
		'2914 <xsd:attribute name="hashValue" type="xsd:base64Binary" use="optional"/>\n' + '2915 <xsd:attribute name="saltValue" type="xsd:base64Binary" use="optional"/>\n' +
		'2916 <xsd:attribute name="spinCount" type="xsd:unsignedInt" use="optional"/>\n' +
		'2917 <xsd:attribute name="sheet" type="xsd:boolean" use="optional" default="false"/>\n' +
		'2918 <xsd:attribute name="objects" type="xsd:boolean" use="optional" default="false"/>\n' +
		'2919 <xsd:attribute name="scenarios" type="xsd:boolean" use="optional" default="false"/>\n' +
		'2920 <xsd:attribute name="formatCells" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2921 <xsd:attribute name="formatColumns" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2922 <xsd:attribute name="formatRows" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2923 <xsd:attribute name="insertColumns" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2924 <xsd:attribute name="insertRows" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2925 <xsd:attribute name="insertHyperlinks" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2926 <xsd:attribute name="deleteColumns" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2927 <xsd:attribute name="deleteRows" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2928 <xsd:attribute name="selectLockedCells" type="xsd:boolean" use="optional" default="false"/>\n' +
		'2929 <xsd:attribute name="sort" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2930 <xsd:attribute name="autoFilter" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2931 <xsd:attribute name="pivotTables" type="xsd:boolean" use="optional" default="true"/>\n' +
		'2932 <xsd:attribute name="selectUnlockedCells" type="xsd:boolean" use="optional" default="false"/>'
	var _serialize = ' if (c_oSerWorksheetProtection.AlgorithmName == type) {\n' + '\t\t\t\tsheetProtection.algorithmName = this.stream.GetUChar();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.SpinCount == type) {\n' + '\t\t\t\tsheetProtection.spinCount = this.stream.GetLong();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.HashValue == type) {\n' + '\t\t\t\tsheetProtection.hashValue = this.stream.GetString2LE(length);\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.SaltValue == type) {\n' + '\t\t\t\tsheetProtection.saltValue = this.stream.GetString2LE(length);\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.Password == type) {\n' + '\t\t\t\tsheetProtection.password = this.stream.GetString2LE(length);\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.AutoFilter == type) {\n' + '\t\t\t\tsheetProtection.autoFilter = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.Content == type) {\n' + '\t\t\t\tsheetProtection.content = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.DeleteColumns == type) {\n' + '\t\t\t\tsheetProtection.deleteColumns = this.stream.GetBool(length);\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.DeleteRows == type) {\n' + '\t\t\t\tsheetProtection.deleteRows = this.stream.GetBool(length);\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.FormatCells == type) {\n' + '\t\t\t\tsheetProtection.formatCells = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.FormatColumns == type) {\n' + '\t\t\t\tsheetProtection.formatColumns = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.FormatRows == type) {\n' + '\t\t\t\tsheetProtection.formatRows = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.InsertColumns == type) {\n' + '\t\t\t\tsheetProtection.insertColumns = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.InsertHyperlinks == type) {\n' + '\t\t\t\tsheetProtection.insertHyperlinks = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.InsertRows == type) {\n' + '\t\t\t\tsheetProtection.insertRows = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.Objects == type) {\n' + '\t\t\t\tsheetProtection.objects = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.PivotTables == type) {\n' + '\t\t\t\tsheetProtection.pivotTables = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.Scenarios == type) {\n' + '\t\t\t\tsheetProtection.scenarios = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.SelectLockedCells == type) {\n' + '\t\t\t\tsheetProtection.selectLockedCells = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.SelectUnlockedCell == type) {\n' + '\t\t\t\tsheetProtection.selectUnlockedCell = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.Sheet == type) {\n' + '\t\t\t\tsheetProtection.sheet = this.stream.GetBool();\n' +
		'\t\t\t} else if (c_oSerWorksheetProtection.Sort == type) {\n' + '\t\t\t\tsheetProtection.sort = this.stream.GetBool();'

	//by test automatic add function
	analizeXmlFrom(_x2tFromXml);
	function analizeAttr (x2t, documentation, serialize) {
		var isUpperCaseName = false;

		var _getAttrVal =  function (from, _name) {
			var _split = from.split(_name + "=\"")
			var _res = null;
			if (_split && _split[1]) {
				for (var i = 0; i < _split[1].length; i++) {
					if (!_res) {
						_res = ""
					}
					if (_split[1][i] === '"') {
						break;
					}
					_res += _split[1][i];
				}
			}
			return _res;
		};

		var docSplit = documentation && documentation.split("element");
		var attributeMapType = [];
		var documentationClassStr = "";
		if (docSplit) {
			for (var j = 0; j < docSplit.length; j++) {
				var _name = _getAttrVal(docSplit[j], "name");
				var _type = _getAttrVal(docSplit[j], "type");
				if (_name && _type) {
					attributeMapType[_name] = _type;
					documentationClassStr += "\n" + "this." + _name + " = null;//" + _type
				}
			}
		}

		var docSplit = documentation && documentation.split("attribute");
		if (docSplit) {
			for (var j = 0; j < docSplit.length; j++) {
				var _name = _getAttrVal(docSplit[j], "name");
				var _type = _getAttrVal(docSplit[j], "type");
				if (_name && _type) {
					attributeMapType[_name] = _type;
					documentationClassStr += "\n" + "this." + _name + " = null;//" + _type
				}
			}
		}
		console.log(documentationClassStr)



		var getFuncName = function (_attrName) {
			var _res = null;
			var _type = attributeMapType[_attrName] && attributeMapType[_attrName].toLowerCase();
			if (_type) {
				if (-1 !== _type.indexOf("bool")) {
					_res = "GetValueBool()"
				} else if (-1 !== _type.indexOf("int")) {
					_res = "GetValueInt()"
				} else if (-1 !== _type.indexOf("double")) {
					_res = "GetValueDouble()"
				}
			}
			return _res;
		};

		var serializeSplit = serialize ? serialize.split("if (") : null;
		var getFuncNameFromSerialize = function (_attrName, _upperAttrName) {
			var _res = null;
			if (!serializeSplit) {
				return null;
			}

			for (var n = 0; n < serializeSplit.length; n++) {
				var isFound
				if (-1 !== (serializeSplit[n].indexOf(_attrName + " = "))) {
					isFound = true
				} else if (-1 !== (serializeSplit[n].indexOf(_upperAttrName  + " = "))) {
					isUpperCaseName = true;
					isFound = true
				}

				if (isFound) {
					var _split2 = serializeSplit[n].split(" = ")
					if (_split2 && _split2[1]) {
						var _type = _split2[1].toLowerCase()
						if (-1 !== _type.indexOf("bool")) {
							_res = "GetValueBool()"
						} else if (-1 !== _type.indexOf("int") || -1 !== _type.indexOf("long")) {
							_res = "GetValueInt()"
						}  else if (-1 !== _type.indexOf("double")) {
							_res = "GetValueDouble()"
						}
					}
					return _res;
				}
			}
			return _res;
		};

		var res = "TEST.prototype.readAttr = function (reader) {\n"

		res += '\n//documentation\n/*' + documentation + '*/\n';
		res += '\n//x2t\n/*' + x2t + '*/\n';
		res += '\n//serialize\n/*' + serialize + '*/\n\n';

		var initUpperCase = false;
		var x2tSplit = x2t.indexOf("WritingElement_ReadAttributes_Read_else_if") !== -1 ? x2t.split("WritingElement_ReadAttributes_Read_else_if") : x2t.split("WritingElement_ReadAttributes_Read_if")
		res += "var val;\n" + "\t\twhile (reader.MoveToNextAttribute()) {\n"
		for (var i = 0; i < x2tSplit.length; i++) {
			var attr = x2tSplit[i].split('"');
			if (attr[1]) {
				if (i !== 0) {
					res += "else "
				}
				res += 'if ("' + attr[1] + '" === reader.GetName()) {\n'

				var funcName = getFuncName(attr[1]);
				if (funcName === null) {
					funcName = getFuncNameFromSerialize(attr[1], attr[1][0].toUpperCase() + attr[1].slice(1));
				} else if (!initUpperCase) {
					getFuncNameFromSerialize(attr[1], attr[1][0].toUpperCase() + attr[1].slice(1));
				}

				initUpperCase = true;

				if (funcName === null) {
					funcName = "GetValue()";
				}

				var attrName = attr[1];
				if (isUpperCaseName) {
					attrName = attr[1][0].toUpperCase() + attr[1].slice(1);
				}

				res += "val = reader." + funcName + ";\n"
				res += "this." + attrName + " = val;\n} ";
			}
		}
		res += "}\n};";
		return res;
	}

	function analizeXmlFrom (x2tFromXml) {
		var isneedGenerateAttr;
		var res = "TEST.prototype.fromXml = function (reader) {\n"

		res += '\n/*' + x2tFromXml + '*/\n\n';

		if (-1 != x2tFromXml.indexOf("ReadAttributes(")) {
			res += "this.readAttr(reader);\n\n";
			isneedGenerateAttr = true;
		}
		if (-1 != x2tFromXml.indexOf("oReader.IsEmptyNode()")) {
			res += "if (reader.IsEmptyNode())\n";
			if (-1 != x2tFromXml.indexOf("oReader.ReadTillEnd();")) {
				res += "reader.ReadTillEnd();";
			}
		} else if (-1 != x2tFromXml.indexOf("oReader.ReadTillEnd();")) {
			res += "reader.ReadTillEnd();";
		}
		if (-1 != x2tFromXml.indexOf("oReader.ReadNextSiblingNode(")) {
			res += "var val;\n" + "\tvar depth = reader.GetDepth();\n";
			res += "while (reader.ReadNextSiblingNode(depth)) {\n"
			res += "var name = reader.GetNameNoNS();\n"

			if (-1 != x2tFromXml.indexOf("GetNameNoNS(oReader.GetName());")) {
				var splitXml = x2tFromXml.substring(x2tFromXml.indexOf("GetNameNoNS(oReader.GetName());")).split('L"')
				for (var i = 1; i < splitXml.length; i++) {
					var namePos = splitXml[i].indexOf("sName")
					var test = splitXml[i].substring(0, namePos + 5)
					test = test.replace("sName", "name")
					test = test.replace(")", "")
					test = test.replace("==", "===")
					test = "\"" + test

					var ifst = "if"
					if (i > 1) {
						ifst = "else if"
					}
					res += ifst + " ( " + test + ") {\n\n} "
				}
			}



			res += "}\n"
		}
		res += "};"

		if (isneedGenerateAttr) {
			res += "\n\n" + analizeAttr(_x2t, _documentation, _serialize);
		}
		console.log(res);
	}

	var _x2tToXml = 'writer.WriteString(L"<person");\n' + '\t\t\t\t\tWritingStringNullableAttrEncodeXmlString(L"displayName", displayName, *displayName);\n' +
		'\t\t\t\t\tWritingStringNullableAttrString(L"id", id, *id);\n' + '\t\t\t\t\tWritingStringNullableAttrString(L"userId", userId, *userId);\n' +
		'\t\t\t\t\tWritingStringNullableAttrEncodeXmlString(L"providerId", providerId, *providerId);\n' + '\t\t\t\twriter.WriteString(L"/>");'

	analizeXmlTo(_x2tToXml, false);
	function analizeXmlTo (x2tToXml, isUpperCaseName) {

		var res = "TEST.prototype.toXml = function (writer) {\n"

		res += '\n/*' + x2tToXml + '*/\n\n';

		var toAttrMap = {
			WritingStringNullableAttrInt: "WriteXmlNullableAttributeNumber",
			WritingStringNullableAttrString: "WriteXmlNullableAttributeString",
			WritingStringNullableAttrEncodeXmlString: "WriteXmlNullableAttributeStringEncode",
			WritingStringAttrString: "WriteXmlAttributeString",
			WritingStringAttrInt: "WriteXmlAttributeNumber",
			WritingStringAttrEncodeXmlString: "WriteXmlAttributeStringEncode",
			WritingStringNullableAttrBool: "WriteXmlNullableAttributeBool",
			WriteEncodeXmlString: "WriteXmlStringEncode"
		};

		var splitRows = x2tToXml.split("\n");
		for (var i = 0; i < splitRows.length; i++) {
			var isWriteAttr = false;
			if (-1 != splitRows[i].indexOf("WritingStringNullableAttrInt")) {
				isWriteAttr = "WritingStringNullableAttrInt";
			} else if (-1 != splitRows[i].indexOf("WritingStringNullableAttrString")) {
				isWriteAttr = "WritingStringNullableAttrString";
			} else if (-1 != splitRows[i].indexOf("WritingStringNullableAttrEncodeXmlString")) {
				isWriteAttr = "WritingStringNullableAttrEncodeXmlString";
			} else if (-1 != splitRows[i].indexOf("WritingStringNullableAttrEncodeXmlString")) {
				isWriteAttr = "WritingStringNullableAttrEncodeXmlString";
			} else if (-1 != splitRows[i].indexOf("WritingStringAttrString")) {
				isWriteAttr = "WritingStringAttrString";
			} else if (-1 != splitRows[i].indexOf("WritingStringAttrInt")) {
				isWriteAttr = "WritingStringAttrInt";
			} else if (-1 != splitRows[i].indexOf("WritingStringAttrEncodeXmlString")) {
				isWriteAttr = "WritingStringAttrEncodeXmlString"
			} else if (-1 != splitRows[i].indexOf("WritingStringNullableAttrBool")) {
				isWriteAttr = "WritingStringNullableAttrBool"
			} else if (-1 != splitRows[i].indexOf("WritingStringNullableAttrDouble")) {
				isWriteAttr = "WritingStringNullableAttrInt"
			}

			if (isWriteAttr) {
				var attrName = splitRows[i].indexOf('L"');
				if (-1 !== attrName) {
					attrName = splitRows[i].substring(attrName)
					attrName = attrName.split('"')
					if (attrName && attrName[1]) {
						attrName = attrName[1]
					}
				}

				if (!attrName) {
					res += "ERROR Do not found attr NAme"
				} else {
					var propName = attrName;
					if (isUpperCaseName) {
						propName = attrName[0].toUpperCase() + attrName.slice(1);
					}
					res += "writer." + toAttrMap[isWriteAttr] + '("' + attrName + '", ' + "this." + propName + ");\n"
				}
			} else {
				if (-1 != splitRows[i].indexOf("WriteString")) {
					splitRows[i] = splitRows[i].replaceAll("WriteString", "WriteXmlString");
				}
				if (-1 != splitRows[i].indexOf("std::wstring")) {
					splitRows[i] = splitRows[i].replaceAll("std::wstring", "var");
				}
				if (-1 != splitRows[i].indexOf("size_t")) {
					splitRows[i] = splitRows[i].replaceAll("size_t", "var");
				}
				if (-1 != splitRows[i].indexOf(' (L"')) {
					splitRows[i] = splitRows[i].replaceAll(' (L"', '("');
				}
				if (-1 != splitRows[i].indexOf('(L"')) {
					splitRows[i] = splitRows[i].replaceAll('(L"', '("');
				}
				if (-1 != splitRows[i].indexOf('(L')) {
					splitRows[i] = splitRows[i].replaceAll('(L', '(');
				}
				if (-1 != splitRows[i].indexOf('L"')) {
					splitRows[i] = splitRows[i].replaceAll('L"', '"');
				}
				if (-1 != splitRows[i].indexOf('.size()')) {
					splitRows[i] = splitRows[i].replaceAll('.size()', '.length');
				}
				if (-1 != splitRows[i].indexOf('->toXML')) {
					splitRows[i] = splitRows[i].replaceAll('->toXML', '.toXML');
				}
				if (-1 != splitRows[i].indexOf('->')) {
					splitRows[i] = splitRows[i].replaceAll('->', '.');
				}
				if (-1 != splitRows[i].indexOf("WriteEncodeXmlString")) {
					splitRows[i] = splitRows[i].replaceAll('WriteXmlStringEncode', '.');
				}


				res += splitRows[i] + "\n";
			}

		}

		res += "};"

		console.log(res)
		return res;
	}




	window['AscCommonExcel'] = window['AscCommonExcel'] || {};
	window['AscCommonExcel'].CT_Workbook = CT_Workbook;
	window['AscCommonExcel'].CT_SharedStrings = CT_SharedStrings;
	window['AscCommonExcel'].CT_PersonList = CT_PersonList;
	window['AscCommonExcel'].CT_SheetData = CT_SheetData;
	window['AscCommonExcel'].CT_Value = CT_Value;
	window['AscCommonExcel'].CT_DrawingWS = CT_DrawingWS;
	window['AscCommonExcel'].CT_DrawingWSRef = CT_DrawingWSRef;
	window['AscCommonExcel'].CT_ExternalReference = CT_ExternalReference;
	window['AscCommonExcel'].CT_Connections = CT_Connections;

})(window);
