import { isEscEvent } from "./util.js"
import { createSlider, destroySlider, resetEffectImage } from "./editor.js";
import { zoomIn, zoonOut } from "./zoom.js";
import { validationHashtag } from "./validation.js";

const imgUpload = document.querySelector('.img-upload');
const uploadFileInput = imgUpload.querySelector('#upload-file');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');

const textHashtags = document.querySelector('.text__hashtags');

const resetForm = () => {
  scaleControlValue.value = '100%';
  imgUploadPreview.style = '';

  resetEffectImage();
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetForm();
  createSlider();

  document.addEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.addEventListener('click', closeUploadForm);
  scaleControlSmaller.addEventListener('click', zoomIn);
  scaleControlBigger.addEventListener('click', zoonOut);
  textHashtags.addEventListener('input', onHashtagsInput);
};

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.classList.remove('modal-open');
  uploadFileInput.value = '';
  destroySlider();

  document.removeEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.removeEventListener('click', closeUploadForm);
  scaleControlSmaller.removeEventListener('cick', zoomIn);
  scaleControlBigger.removeEventListener('click', zoonOut);
  textHashtags.removeEventListener('input', onHashtagsInput);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    if (!document.activeElement.matches('.text__hashtags') && !document.activeElement.matches('.text__description')) {
      closeUploadForm();
    }
  }
};

const onHashtagsInput = () => {
  textHashtags.setCustomValidity('');
  textHashtags.style.border = 'none';

  const errorMessage = validationHashtag(textHashtags.value);
  if (errorMessage) {
    textHashtags.setCustomValidity(errorMessage);
    textHashtags.style.border = '2px solid red';
  } else {
    textHashtags.style.border = 'none';
  }

  textHashtags.reportValidity();
};

uploadFileInput.addEventListener('change', openUploadForm);
