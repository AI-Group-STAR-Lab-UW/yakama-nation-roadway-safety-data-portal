import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactExport from 'react-data-export';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

class DownloadCrashDataTable extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { pointSafetyIndex } = this.props;
    const { name } = this.props;
    const columnName = ['ACCTYPE', 'ACCYR', 'LATITUDE', 'LONGITUDE', 'SEVERITY', 'rodwycls'];
    return (
      <ExcelFile filename="Crash_Data" element={<button type="submit" className="btn btn-success btn-fill">{name}</button>}>
        <ExcelSheet data={pointSafetyIndex} name="Crash Data">
          {columnName.map((col) => {
            return (
              <ExcelColumn label={col} value={col} />
            );
          })}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

const mapStateToProps = (state) => (
  {
    formParams: state.FormReducer.formParams,
    pointSafetyIndex: state.pointSafetyIndexReducer.pointSafetyIndex,
  }
);

export default connect(mapStateToProps, null)(DownloadCrashDataTable);
