package com.front

import android.content.Intent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule

class MainActivity : ReactActivity() {
    private var pendingIntentData: String? = null

    override fun getMainComponentName(): String = "front"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        val dataString = intent.dataString
        reactInstanceManager?.currentReactContext?.let { reactContext ->
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("url", dataString ?: "")
        } ?: run {
            pendingIntentData = dataString
        }
    }

    override fun onResume() {
        super.onResume()
        pendingIntentData?.let { url ->
            reactInstanceManager?.currentReactContext?.let { reactContext ->
                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("url", url)
                pendingIntentData = null
            }
        }
    }
}
