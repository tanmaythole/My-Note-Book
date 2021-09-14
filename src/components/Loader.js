import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const Loader = () => {
    let arr = [1,2,3,4,5,6,7,8];
    return (
        <Row>
            {arr.map((e)=>{
                return <div className="col-md-3 mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title><Skeleton height="25px" width="80%" /></Card.Title>
                            <Card.Text>
                                <Skeleton count={2} />
                            </Card.Text>
                            <Card.Text className="text-muted" style={{fontSize:'14px'}} >
                                <Skeleton width="80%" height="12px" />
                            </Card.Text>
                            <Skeleton width="20%" height="25px" />{' '}
                            <Skeleton width="20%" height="25px" />
                        </Card.Body>
                    </Card>
                </div>
            })}
        </Row>
    )
}

export default Loader
