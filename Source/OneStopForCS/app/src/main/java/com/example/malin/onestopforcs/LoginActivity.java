package com.example.malin.onestopforcs;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.SpannableString;
import android.text.style.UnderlineSpan;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.facebook.AccessToken;
import com.facebook.AccessTokenTracker;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;

/**
 * Created by malin on 23-09-2016.
 */

public class LoginActivity extends AppCompatActivity {

    static final String NAME = "name";
    private CallbackManager callbackManager;

    private AccessTokenTracker accessTokenTracker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initialize the SDK before executing any other operations,

        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        callbackManager = CallbackManager.Factory.create();
        setContentView(R.layout.login);
        LoginButton button = (LoginButton) findViewById(R.id.login_button);
        TextView textView = (TextView) findViewById(R.id.lbl_signUp);
        SpannableString content = new SpannableString("No account yet? Create one");
        content.setSpan(new UnderlineSpan(), 0, content.length(), 0);
        textView.setText(content);

        button.setReadPermissions(Arrays.asList("public_profile", "email", "user_photos", "user_birthday", "user_friends"));
        button.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                GraphRequest request = GraphRequest.newMeRequest(loginResult.getAccessToken(), new GraphRequest.GraphJSONObjectCallback() {
                            @Override
                            public void onCompleted(JSONObject object, GraphResponse response) {
                                String name = "";
                                String id = "";
                                String gender = "";
                                String email = "";
                                String profilePicture = "";
                                String birthday = "";

                                try {
                                    name = object.getString("name");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                                try {
                                    id = object.getString("id");
                                    profilePicture = "https://graph.facebook.com/" + id + "/picture?type=large&redirect=true&width=600&height=600";
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                                try {
                                    gender = object.getString("gender");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                                try {
                                    birthday = object.getString("birthday");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                                try {
                                    email = object.getString("email");
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                                Intent intent = new Intent(LoginActivity.this, Home.class);
                                intent.putExtra(NAME, name);
                                startActivity(intent);
                            }

                });
                Bundle parameters = new Bundle();
                parameters.putString("fields", "id,name,link,birthday,picture,email,gender");
                request.setParameters(parameters);
                request.executeAsync();
            }

            @Override
            public void onCancel() {

            }

            @Override
            public void onError(FacebookException error) {

            }

        });

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        return super.onOptionsItemSelected(item);
    }

    public void checkCredentials(View v) {
        EditText usernameCtrl = (EditText) findViewById(R.id.txt_uname);
        EditText passwordCtrl = (EditText) findViewById(R.id.txt_Pwd);
        TextView errorText = (TextView) findViewById(R.id.lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        boolean validationFlag = false;
        //Verify if the username and password are not empty.
        if (!userName.isEmpty() && !password.isEmpty()) {
            if (userName.equals("abc@gmail.com") && password.equals("Password")) {
                validationFlag = true;

            }
        }
        if (!validationFlag) {
            errorText.setVisibility(View.VISIBLE);
        } else {
            //This code redirects the from login page to the home page.
            Intent nextpage = new Intent(LoginActivity.this, Home.class);
            startActivity(nextpage);
        }

    }

    public void signUp(View v) {
        Intent signup = new Intent(LoginActivity.this, SignUp.class);
        startActivity(signup);
    }
}
