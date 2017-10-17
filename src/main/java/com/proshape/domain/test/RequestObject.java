package com.proshape.domain.test;

/**
 * Created by Katarzyna on 2017-10-09.
 */
public class RequestObject {
    String userId;
    String value;

    public RequestObject(){

    }

    public RequestObject(String userId, String value) {
        this.userId = userId;
        this.value = value;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
