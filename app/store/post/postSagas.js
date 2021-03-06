import { call, all, put, takeEvery, takeLatest, take, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  getLastPostId,
  getSearchKeyword,
  getLastSearchResultId,
  getShowPostId,
  getNewPost,
} from './postSelector'
import { getUserProfileId, getLoggedInUserProfileId} from './../user/userSelector'
import { getConfiguration } from './../configuration/configurationSelector'

import {
  requestUserProfileLoadPost,
  successLoadPost,
  successLoadMorePost,
  successSearchForPost,
  successSearchMorePost,
  successPostShow,
  successUserProfileLoadPost,
  successAddNewPost,
  failureLoadPost,
  failureLoadMorePost,
  failureSearchForPost,
  failureSearchMorePost,
  failurePostShow,
  failureUserProfileLoadPost,
  requestLoggedInUserProfileLoadPost,
  successLoggedInUserProfileLoadPost,
  failureLoggedInUserProfileLoadPost,
  failureAddNewPost,
  REQUEST_POST_LOAD,
  REQUEST_POST_LOAD_MORE,
  REQUEST_POST_SEARCH,
  REQUEST_POST_SEARCH_MORE,
  REQUEST_POST_SHOW,
  REQUEST_USER_PROFILE_LOAD_POST,
  REQUEST_LOGGED_IN_USER_PROFILE_LOAD_POST,
  REQUEST_ADD_NEW_POST,
} from "./postActions"

import {SUCCESS_USER_PROFILE, SUCCESS_LOGGED_IN_USER_PROFILE} from './../user/userActions'

export const serverIP = '10.160.11.56:8080';
export const timelineCount = 50;
export const searchCount = 50;

export function* loadTimeline() {

  const url = generateTimelineUrl(serverIP, timelineCount);

  try{
    const response = yield call(fetch, url);
    const data = yield call([response, 'json']);
    yield put(successLoadPost(data));
  } catch (er) {
    console.log(er);
    yield put(failureLoadPost(er));
  }
}

function* watchLoadTimeline() {
  yield takeLatest(REQUEST_POST_LOAD, loadTimeline);
}

export function* infiniteScrollTimeline() {
  try {

    const maxID = yield select(getLastPostId);
    let url = `http://${serverIP}/timeline?count=${timelineCount}&max_id=${maxID}`;
    const response = yield call(fetch, url);
    const data = yield call([response, 'json']);
    yield put(successLoadMorePost(data.slice(1)));
  } catch(er) {
    console.log(er);
    yield put(failureLoadMorePost(er));
  }
}

function* watchInfiniteScrollTimeline() {
  yield takeLatest(REQUEST_POST_LOAD_MORE, infiniteScrollTimeline);
}

export function* searchForPost() {
  try {
    const searchKeyword = yield select(getSearchKeyword);
    const url = `http://${serverIP}/search?q=${searchKeyword}&count=${searchCount}`;
    const response = yield call(fetch,url);
    const data = yield call([response, 'json']);
    yield put(successSearchForPost(data.statuses, searchKeyword));
  } catch (er) {
    console.log(er);
    yield put(failureSearchForPost(er));
  }
}

function* watchSearchForPost() {
  yield takeLatest(REQUEST_POST_SEARCH, searchForPost)
}

export function* searchMorePost() {
  try {
    const searchKeyword = yield select(getSearchKeyword);
    const maxID = yield select(getLastSearchResultId);
    const url = `http://${serverIP}/search?q=${searchKeyword}&max_id=${maxID}&count=${searchCount}`;

    const response = yield call(fetch,url);
    const data = yield call([response, 'json']);
    yield put(successSearchMorePost(data.statuses.slice(1)));
  } catch (er) {
    console.log(er);
    yield put(failureSearchMorePost(er));
  }
}

function* watchSearchMorePost() {
  yield takeLatest(REQUEST_POST_SEARCH_MORE, searchMorePost);
}

export function* showPost() {
  try {
    const id = yield select(getShowPostId);
    const url = `http://${serverIP}/show?id=${id}`;
    const response = yield call(fetch,url);
    const data = yield call([response, 'json']);
    yield put(successPostShow(data));
  } catch (er) {
    console.log(er);
    yield put(failurePostShow(er));
  }
}

function* watchShowPost() {
  yield takeLatest(REQUEST_POST_SHOW, showPost);
}

export function* loadUserProfileTimeline() {
  try {
    const id = yield select(getUserProfileId);
    const url = `http://${serverIP}/user_timeline?user_id=${id}`;
    const response = yield call(fetch,url);
    const data = yield call([response, 'json']);
    yield put(successUserProfileLoadPost(data));
  } catch (er) {
    console.log(er);
    yield put(failureUserProfileLoadPost(er));
  }
}

function* watchLoadUserProfileTimeline() {
  yield takeLatest(REQUEST_USER_PROFILE_LOAD_POST, loadUserProfileTimeline);
}

function* onUserProfileLoaded() {
  yield put(requestUserProfileLoadPost());
}

function* watchUserProfileLoaded() {
  yield takeLatest(SUCCESS_USER_PROFILE, onUserProfileLoaded);
}

export function* loadLoggedInUserProfileTimeline() {
  try {
    const id = yield select(getLoggedInUserProfileId);
    const url = `http://${serverIP}/user_timeline?user_id=${id}`;
    const response = yield call(fetch,url);
    const data = yield call([response, 'json']);
    yield put(successLoggedInUserProfileLoadPost(data));
  } catch (er) {
    console.log(er);
    yield put(failureLoggedInUserProfileLoadPost(er));
  }
}

function* watchLoadLoggedInUserProfileTimeline() {
  yield takeLatest(REQUEST_LOGGED_IN_USER_PROFILE_LOAD_POST, loadLoggedInUserProfileTimeline);
}

function* onLoggedInUserProfileLoaded() {
  yield put(requestLoggedInUserProfileLoadPost());
}

function* watchLoggedInUserProfileLoaded() {
  yield takeLatest(SUCCESS_LOGGED_IN_USER_PROFILE, onLoggedInUserProfileLoaded);
}

function* addNewPost() {
  try {
    const post = yield select(getNewPost);
    const url = `http://${serverIP}/post`;

    const request = {
      body: JSON.stringify({status: post}),
      method: 'POST',
      headers: new Headers({
                'Content-Type': 'application/json'
      })
    }

    const response = yield call(fetch, url, request);
    const data = yield call([response, 'json']);
    console.log(data);
    yield put(successAddNewPost(data));
  } catch (er) {
    console.log(er);
    yield put(failureAddNewPost(er));
  }
}

function* watchAddNewPost() {
  yield takeLatest(REQUEST_ADD_NEW_POST, addNewPost);
}


export default function* postSagas() {
  yield all([
    watchLoadTimeline(),
    watchInfiniteScrollTimeline(),
    watchSearchForPost(),
    watchSearchMorePost(),
    watchShowPost(),
    watchLoadUserProfileTimeline(),
    watchUserProfileLoaded(),
    watchLoadLoggedInUserProfileTimeline(),
    watchLoggedInUserProfileLoaded(),
    watchAddNewPost(),
  ])
}

export const generateTimelineUrl = (serverIP,count) => {
  return `http://${serverIP}/timeline?count=${count}`;
}
