package com.example.malin.onestopforcs;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;

/**
 * Created by ACHU on 10/12/2016.
 */
public class SlideMainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slidemain);

        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        Button button = (Button)findViewById(R.id.button);
        EditText edit = (EditText)findViewById(R.id.editText);

        edit.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                // EditText in the focus off
                if (! hasFocus) {
                    // to hide soft keyboard
                    InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(v.getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
                }
            }
        });

        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                //
                getItems();
            }
        });
    }

    public void getItems() {
        APISlideShow.search(this, 1);
    }

}
