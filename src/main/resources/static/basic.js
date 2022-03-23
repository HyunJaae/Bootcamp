// 미리 작성된 영역 - 수정하지 않으셔도 됩니다.
// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        // trim은 앞뒤로 공백이 있으면 공백을 자른다.(중간 공백은 아님) " dev lee " -> "dev lee"
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 익명의 username을 만듭니다.
function genRandomName() {
    let result = $('#writer').val();
    return result;
}

// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 여기서부터 코드를 작성해주시면 됩니다.

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getMessages();
})

// 메모를 불러와서 보여줍니다.
function getMessages() {
    // 1. 기존 메모 내용을 지웁니다.
    $('#cards-box').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/posts',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let post = response[i];
                let id = post.id;
                let username = post.username;
                let content = post.contents;
                let modifiedAt = convertUTCTimeToSeoulTime(post['modifiedAt']);
                addHTML(id, username, content, modifiedAt)
            }
        }
    })
}
function convertUTCTimeToSeoulTime(UTCDate){
    let SeoulTime = new Date(UTCDate)
    SeoulTime.setHours(SeoulTime.getHours() +9)
    console.log(SeoulTime.toLocaleString())
    return SeoulTime.toLocaleString()
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, username, content, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `<div class="card">
                                <!-- date/username 영역 -->
                                <div class="metadata">
                                    <div class="date">
                                        ${modifiedAt} 
                                    </div>
                                    <div id="${id}-username" class="username">
                                        ${username}
                                    </div>
                                </div>
                                <!-- contents 조회/수정 영역-->
                                <div class="contents" >
                                    <div id="${id}-contents" class="text" onclick="selectMyPost('${id}')">
                                        ${content}
                                    </div>
                                    <div id="${id}-editarea" class="edit">
                                        <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                                    </div>
                                </div>
                                <!-- 버튼 영역-->
                                <div class="footer">
                                    <img id="${id}-edit" class="icon-start-edit" src="images/edt.png" alt="" onclick="editPost('${id}')">
                                    <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                                    <img id="${id}-submit" class="icon-end-edit" src="images/check.png" alt="" onclick="submitEdit('${id}')">
                                </div>
                            </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

function selectMyPost(id) {
    $('#modalBox').empty();
    $('#modalBox').addClass('active');

    $.ajax({
        type: 'GET',
        url: `/api/posts/${id}`,
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                let myPost = response[i];
                let id = myPost.id;
                let username = myPost.username;
                let content = myPost.contents;
                let modifiedAt = myPost.modifiedAt;
                console.log(id, username, content, modifiedAt);
                addSelect(id, username, content, modifiedAt);
            }
        }
    })
}

function addSelect(id, username, content, modifiedAt) {
    let selectHtml = `
                        <div class="popup">
                            <div class="modalMeta">
                                <div class="modalTime">${modifiedAt}</div>
                                <div id="${id}-modalUsername" class="modalId">${username}</div>
                            </div>
                            <div class="modalContents">
                                <div id="${id}-modalContents" class="modalText">
                                    ${content}
                                </div>
                                <div id="${id}-modalEditarea" class="modalEdit">
                                    <textarea id="${id}-modalTextarea" class="modalTe-edit" name="" id="" cols="30" rows="5"></textarea>
                                </div>
                            </div> 
                            <div class="modalFooter">
                                <img id="${id}-modalEdit" onclick="modalEditPost('${id}')" class="modalIcon-start-edit" src="images/edt.png" alt="">
                                <img id="${id}-modalDelete" onclick="modalOut()" class="modalIcon-delete" src="images/modalout.png" alt="">
                                <img id="${id}-modalSubmit" onclick="modalSubmitEdit('${id}')" class="modalIcon-end-edit" src="images/check.png" alt="">
                            </div>
                        </div>
                     `;
    $('#modalBox').append(selectHtml);
}

function modalEditPost(id) {
    modalShowEdits(id);
    let contents = $(`#${id}-modalContents`).text().trim();
    $(`#${id}-modalTextarea`).val(contents);
}

function modalShowEdits(id) {
    $(`#${id}-modalEditarea`).show();
    $(`#${id}-modalSubmit`).show();
    $(`#${id}-modalDelete`).show();

    $(`#${id}-modalContents`).hide();
    $(`#${id}-modalEdit`).hide();
}

function modalHideEdits(id) {
    $(`#${id}-modalEditarea`).hide();
    $(`#${id}-modalSubmit`).hide();
    $(`#${id}-modalDelete`).hide();

    $(`#${id}-modalContents`).show();
    $(`#${id}-modalEdit`).show();
}

function modalSubmitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let username = $(`#${id}-modalUsername`).text().trim();
    let contents = $(`#${id}-modalTextarea`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'username': username, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`, // 백틱
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            selectMyPost(id);
            getMessages();
        }
    });
}

function modalOut() {
    $('#modalBox').removeClass('active');
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let contents = $('#contents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. genRandomName 함수를 통해 익명의 username을 만듭니다.
    let username = genRandomName();
    if(username == "") {
        alert("ID를 입력해주세요.");
    } else{
        // 4. 전달할 data JSON으로 만듭니다.
        let data = {'username': username, 'contents': contents};
        // 5. POST /api/memos 에 data를 전달합니다.
        $.ajax({
            type: "POST",
            url: "/api/posts",
            contentType: "application/json", // JSON 형식으로 전달함을 알리기
            data: JSON.stringify(data), // ARC에서는 body였던 부분, 데이터는 string으로만 주고 받아야해서 string으로 변환
            success: function (response) {
                window.location.reload();
            }
        });
    }
}

// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'username': username, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`, // 백틱
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            window.location.reload();
        }
    });
}

// 메모를 삭제합니다.
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/posts/${id}`,
        success: function (response) {
            window.location.reload();
        }
    })
}