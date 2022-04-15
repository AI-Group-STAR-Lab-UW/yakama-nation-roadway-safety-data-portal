import React, { Component } from 'react';

export class Contact extends Component {
  render() {
    return (
      <div>
        <div id="contact">
          <div className="container">
            {/*
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                        <p className="help-block text-danger" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                        <p className="help-block text-danger" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="subject"
                          id="subject"
                          className="form-control"
                          placeholder="Subject"
                          required="required"
                        />
                        <p className="help-block text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                    />
                    <p className="help-block text-danger" />
                  </div>
                  <div id="success" />
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker" /> Address
                  </span>
                  {this.props.data ? this.props.data.address : 'loading'}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone" /> Phone
                  </span>{' '}
                  {this.props.data ? this.props.data.phone : 'loading'}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o" /> Email
                  </span>{' '}
                  {this.props.data ? this.props.data.email : 'loading'}
                </p>
              </div>
            </div>
            */}

            <div className="col-md-12">
              <div className="row">
                <div className="social image-containers">
                  <img src={require('../../assets/images/usdot.svg')} className="img-responsive" alt="" />
                  <img src={require('../../assets/images/yakama_logo.png')} className="img-responsive" alt="" />
                  <img src={require('../../assets/images/STARLab_LOGO_2017.png')} className="img-responsive" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
