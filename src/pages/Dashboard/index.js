import React, { Component, useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import axios from "../../axios";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
// import SalesAnalytics from "./SalesAnalytics";
import MiniWidgets from "./MiniWidgets";



const StarterPage = () => {

    // const [tableData, setTableData] = useState([]);

    // useEffect(() => {
    //     getCategory();
    //   }, []);


    //   const getCategory = async () => {
    //     try {
    //       const { data } = await axios.get("/api/v1/admin/getDashboard");
    //       setTableData(data.data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };



    const  breadcrumbItems = [
        { title : "L&T", link : "#" },
        { title : "Dashboard", link : "#" },
    ];


    const reports = [
        { icon : "ri-user-fill", title : "Total Number of Users", value : "75" },
        { icon : "ri-user-fill", title : "Total Number of Subscription plan", value : "50" },
        // { icon : "ri-user-fill", title : "Number of Active Users", value : tableData.activeUsers },
        // { icon : "ri-building-2-fill", title : "Total Number of Investor", value : "850" },
    ]

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
                    <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets reports={reports} />
                                </Row>
                                
                                {/* revenue Analytics
                                <RevenueAnalytics/> */}
                            </Col>

                            {/*<Col xl={4}>

                                {/* sales Analytics */}
                                {/*<SalesAnalytics/>*/}

                                {/* earning reports */}
                                {/* <EarningReports/> */}

                            {/*</Col>*/}
                        </Row>
                    </Container> 
                </div>
            </React.Fragment>
        );
}

export default StarterPage;