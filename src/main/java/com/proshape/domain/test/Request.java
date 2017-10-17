package com.proshape.domain.test;

import java.util.List;

/**
 * Created by Katarzyna on 2017-10-09.
 */
public class Request {
    String description;
    String monthYear;
    List<RequestObject> objects;

    public Request(){

    }

    public Request(String description, String monthYear) {
        this.description = description;
        this.monthYear = monthYear;
    }

    public Request(String description, String monthYear, List<RequestObject> objects) {
        this.description = description;
        this.monthYear = monthYear;
        this.objects = objects;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public List<RequestObject> getObjects() {
        return objects;
    }

    public void setObjects(List<RequestObject> objects) {
        this.objects = objects;
    }
}
