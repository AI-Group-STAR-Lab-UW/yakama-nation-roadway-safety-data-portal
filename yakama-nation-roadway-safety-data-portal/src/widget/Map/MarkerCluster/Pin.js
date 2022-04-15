import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import './map-widget.css';

class Pin extends React.Component {
  render() {
    return (
      <Marker
        className="circle"
        position={this.props.center}
        fillOpacity={this.props.opacity}
        weight={0}
        icon={
            new Icon({
              iconUrl: require('../../../assets/images/accident.png'),
              className: 'oba-bus-stop-icon',
              iconAnchor: [17, 7],
            })
          }
        {...this.props}
      >
        <Popup>
          <span className="pop-up">
            Year:
            {' '}
            { this.props.popup.ACCYR }
            <br />
            Roadway type:
            {' '}
            { this.props.popup.rodwycls }
            <br />
            Crash severity:
            {' '}
            { this.props.popup.SEVERITY }
          </span>
        </Popup>
      </Marker>
    );
  }
}

export default Pin;
