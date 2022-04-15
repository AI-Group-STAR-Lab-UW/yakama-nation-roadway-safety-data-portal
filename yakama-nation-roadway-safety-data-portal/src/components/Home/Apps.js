import React, { Component } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Features from './Features';
import About from './About';
import Contact from './Contact';

class Apps extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      landingPageData: {
        Header: {

          title: 'Yakama Nation Roadway Safety Data Portal',
          paragraph: '',

        },
        About: {
          paragraph: 'Funded by U.S. Department of Transportation “State and Local Government Data Analysis Tools for Roadway Safety” grant, the Yakama Nation Roadway Safety Data Portal is an online comprehensive roadway safety data visualization and evaluation platform. The system is based on a transportation multi-source data management, fusion, analysis, and visualization platform that the University of Washington STAR Lab team has developed, called the Digital Roadway Interactive Visualization and Evaluation Network (DRIVE Net) (Xiao et al., 2015; Wang et al., 2016). The system provides users with the capability to store and manage the safety data efficiently. Besides data management, the system also supports various analytical and visualization functions, such as crash data visualization, crash modeling analysis, roadway safety performance index estimation, network screening and hotspot identification, etc.',
          Why: [
          ],
          Why2: [
          ],
        },
        Contact: {
          address: 'More Hall 101, University of, Seattle, WA 98195 ',
          phone: '+1 206 616 2696',
          email: 'yinhai[at]uw.edu',
          linkedin: 'https://www.linkedin.com/groups/13606303/',
          twitter: 'https://twitter.com/UWstarlab?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Elist%3AMeixin76876576%3Astar&ref_url=http%3A%2F%2Fwww.uwstarlab.org%2Findex.html',
          youtube: 'https://www.youtube.com/channel/UCxo1VPF0XZlPvu-vcRUfw3A',
        },
        Features: [{
          icon: 'fa fa-map-marker',
          title: 'Point-based Crash Visualization',
          text: 'Visualize crash data on the map by the crashes locations',
          link: '/applications/point-safety-index',
          permission: 0,
        },
        {
          icon: 'fa fa-road',
          title: 'Segment-based Safety Index',
          text: 'Visualize crash data on the map by roadway segments',
          link: '/applications/segment-safety-index',
          permission: 0,
        },
        {
          icon: 'fa fa-pie-chart',
          title: 'Zipcode-based Safety Index',
          text: 'Visualize crash data on the map by different zipcode',
          link: '/applications/zipcode-safety-index',
          permission: 0,
        },
        {
          icon: 'fa fa-bus',
          title: 'Intersection-based Safety Index',
          text: 'Visualize crash data on the map by different intersections',
          link: '/applications/intersection-safety-index',
          permission: 0,
        },
        {
          icon: 'fa fa-map',
          title: 'Crash Heatmap',
          text: 'Visualize crash frequencies and severities with heatmap',
          link: '/applications/accident-heatmap',
          permission: 0,
        },
        {
          icon: 'fa fa-bar-chart',
          title: 'Safety Performance',
          text: 'Esimate traffic network safety and visualize the position of history incident events',
          link: '/applications/incident-frequency',
          permission: 0,
        },
        {
          icon: 'fa fa-cloud-download',
          title: 'Crash Data Download',
          text: 'Customized crash data download with user-specific settings',
          link: '/applications/crash-data-download',
          permission: 0,
        },
        {
          icon: 'fa fa-area-chart',
          title: 'Summary Report',
          text: 'Reporting functions with customized tables and figures',
          link: '/applications/summary-report',
          permission: 0,
        },
        ],
      },

    };
  }

  render() {
    return (
      <div>
        <Navigation />
        <Header data={this.state.landingPageData.Header} />
        <Features data={this.state.landingPageData.Features} />
        <About data={this.state.landingPageData.About} />
        <Contact data={this.state.landingPageData.Contact} />
      </div>
    );
  }
}

export default Apps;
