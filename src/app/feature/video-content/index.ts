export { VideoContentComponent } from './video-content.component';
/*
# Video Content Component Documentation

## Overview

The `VideoContentComponent` is an Angular component that displays video content along with associated information and action buttons.
 This component allows users to view a video, read its title and description, and perform actions associated with the video.

## Usage

To use the `VideoContentComponent`, include the `<app-video-content>` element in your HTML, and provide the necessary input data.

```html
<app-video-content [data]="videoData" [sharingData]="sharingData"></app-video-content>
```

## Properties

### `data` (Input)

- **Type:** `any`
- **Description:** The data object containing information about the video and associated action.

### `sharingData` (Input)

- **Type:** `any`
- **Description:** Data for sharing the video.

## Structure

The component consists of the following sections:

1. **Video Wrapper**
   - Contains an iframe to display the video.

2. **Content**
   - Displays video title and description.

3. **Action Button**
   - Provides a button to perform an action associated with the video.

4. **Slanting Background**
   - Adds a decorative slanting background to the component.

5. **Background Stripes**
   - Adds decorative background stripes to the component.

## Example

```html
<app-video-content
  [data]="{
    video_url: 'https://example.com/video.mp4',
    video_title: 'Sample Video',
    video_description: 'This is a sample video',
    action_button_url: 'https://example.com/action',
    action_button_text: 'Action'
  }"
  [sharingData]="{
    shareUrl: 'https://example.com/video',
    shareText: 'Check out this video!'
  }"
></app-video-content>
```

## Actions

- When the action button is clicked, it triggers a function to perform a specific action related to the video.

## Dependencies

- This component relies on the `ShareButtonComponent` from the shared module to provide sharing functionality.

## Testing

- Unit tests are provided to ensure the component functions correctly, including button click behavior.

## Notes

- Ensure that appropriate video URLs and action URLs are provided in the `data` object for the component to function as expected.
- The component's appearance can be further customized using CSS styles.

---

This documentation provides an overview of the `VideoContentComponent` and how to use it in your Angular application. 

*/
