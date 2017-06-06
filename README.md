
# Motion Tracker

Simple app for tracking falls or hits (acceleration changes) on the device
ands sends the information to the [motiont-webtask](https://github.com/gsilvatici/motiont-webtask).

## Install

This is a intelXDK project so you need to have the intelXDK and then donwload/import the project.
Once imported, the project can be exported to different platforms or test it with the "App Preview" app available in the AppStore or PlayStore.

## Usage

The app is very simple, it will show a vertical bar and it's width will show the total magnitude of acceleration that the device senses, if it is still or moving at constant speed the width of the bar will be measuring 9.8m/s2 (gravity). If it senses a big acceleration the device will vibrate and send the time, magnitude and location to the webtask server.

The acceleration number that triggers the request can be changed on the app settings.

The records are displayed in this [page](https://wt-210a0744fa5cd1b641dc6a2bbd8fb340-0.run.webtask.io/motiont-view).


## Considerations

It is mandatory to calibrate the app in the settings and set the desired sensitivity for the particular device that is running it.
The webtask url is hardcoded in the app.js, it can be changed with a new generated webtask for the 
[motiont-webtask](https://github.com/gsilvatici/motiont-webtask) project.

## Author

Gabriel Silvatici.



