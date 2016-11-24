package com.zha.util;

import java.beans.PropertyEditorSupport;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 * Created by java on 2016/11/21.
 */
public class CustomDateEditor extends PropertyEditorSupport {

    public static final String DATE_FORMAT_SECOND = "yyyy-MM-dd HH:mm:ss";
    private DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT_SECOND);

    public CustomDateEditor() {
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        super.setAsText(text);
    }

    @Override
    public String getAsText() {
        return super.getAsText();
    }
}
