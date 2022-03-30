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
    let result = $('#header-title-login-user').text();
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
                loginUserOnly(id, username);
            }
        }
    })
}
// 서버 시간을 한국 시간으로 맞춤
function convertUTCTimeToSeoulTime(UTCDate){
    let SeoulTime = new Date(UTCDate)
    SeoulTime.setHours(SeoulTime.getHours())
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
                                    <img id="${id}-edit" class="none icon-start-edit" src="../images/edt.png" alt="" onclick="editPost('${id}')">
                                    <img id="${id}-delete" class="none icon-delete" src="../images/delete.png" alt="" onclick="deleteOne('${id}')">
                                    <img id="${id}-submit" class="none icon-end-edit" src="../images/check.png" alt="" onclick="submitEdit('${id}')">
                                </div>
                            </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}
// 자기가 쓴 글만 볼 수 있다.
function loginUserOnly(id, username) {
    let loginUser = $('#header-title-login-user').text();
    console.log(loginUser);
    if(username === loginUser) {
        $(`#${id}-edit`).removeClass('none');
        $(`#${id}-delete`).removeClass('none');
        $(`#${id}-submit`).removeClass('none');
    }
}

// 모달 창 시작
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
                let modifiedAt = convertUTCTimeToSeoulTime(myPost['modifiedAt']);
                console.log(id, username, content, modifiedAt);
                addSelect(id, username, content, modifiedAt);
                modal_loginUserOnly(id, username);
                read_comments(id, username);
            }
        }
    })
}

function addSelect(id, username, content, modifiedAt) {
    let selectHtml = `
                        <div>
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
                            <img id="${id}-comment" onclick="comments('${id}')" class="none commentIcon" src="../images/comment.png" alt="">
                                <img id="${id}-modalEdit" onclick="modalEditPost('${id}')" class="none modalIcon-start-edit" src="../images/edt.png" alt="">
                                <img id="${id}-modalDelete" onclick="modalOut()" class="modalIcon-delete" src="../images/modalout.png" alt="">
                                <img id="${id}-modalSubmit" onclick="modalSubmitEdit('${id}')" class="none modalIcon-end-edit" src="../images/check.png" alt="">
                            </div>
                        </div>
                        <div id="${id}-write_comment" class="none write_comment">
                            <textarea class="comment_field" placeholder="댓글을 남겨주세요." name="write_comment_contents" id="${id}-commentTextarea" cols="30"
                                      rows="5"></textarea>
                            <img  class="add_comment_icon" src="../images/plane.png" alt="" onclick="add_comment(${id})">
                            <img  class="comment_out_icon" src="../images/modalout.png" alt="" onclick="comment_out(${id})">
                        </div>
                        </div>
                        <div id="commentBox"></div>
                     `;
    $('#modalBox').append(selectHtml);
}

function modal_loginUserOnly(id, username) {
    let loginUser = $('#header-title-login-user').text();
    console.log(loginUser);
    // 로그인한 유저라면 댓글은 달 수 있게 한다.
    if(loginUser != "") {
        $(`#${id}-comment`).removeClass('none');
    }
    console.log(loginUser);
    if(username === loginUser) {
        $(`#${id}-modalEdit`).removeClass('none');
        $(`#${id}-modalSubmit`).removeClass('none');
    }
}

function modalEditPost(id) {
    modalShowEdits(id);
    $(`#${id}-comment`).addClass('none');
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

// 댓글 창 시작
// 댓글 작성란 보이기
function comments(id) {
    $(`#${id}-write_comment`).removeClass('none');
}

// 작성란 없애기
function comment_out(id) {
    $(`#${id}-write_comment`).addClass('none');
}

function add_comment(id) {
    // 댓글 창은 없어진다.
    comment_out(id);
    // 1. 작성한 댓글을 불러옵니다.
    let comment_contents = $(`#${id}-commentTextarea`).val();
    comment_contents = comment_contents.replaceAll(/(\n|\r\n)/g, "<br>");
    console.log(comment_contents);
    // 2. 작성한 댓글이 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(comment_contents) == false) {
        return;
    }
    // 3. genRandomName 함수를 통해 로그인한 유저 ID를 가져옵니다.
    let username = genRandomName();
    if(username == "") {
        alert("어떻게 여기까지 왔지?");
    } else{
        // 4. 전달할 data JSON으로 만듭니다.
        let data = {'uid': id,'username': username, 'contents': comment_contents};
        // 5. POST /api/memos 에 data를 전달합니다.
        $.ajax({
            type: "POST",
            url: "/api/comments",
            contentType: "application/json", // JSON 형식으로 전달함을 알리기
            data: JSON.stringify(data), // ARC에서는 body였던 부분, 데이터는 string으로만 주고 받아야해서 string으로 변환
            success: function (response) {
                selectMyPost(id);
            }
        });
    }
}

function read_comments(id, username) {
    $('#commentBox').empty();

    $.ajax({
        type: 'GET',
        url: `/api/comments/${id}`,
        success: function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                let comments = response[i];
                let id = comments.id;
                let uid = comments.uid;
                let username = comments.username;
                let content = comments.contents;
                let modifiedAt = convertUTCTimeToSeoulTime(comments['modifiedAt']);
                console.log(id, username, content, modifiedAt);
                add_comment_HTML(id, uid, username, content, modifiedAt);
                comment_loginUserOnly(id);
            }
        }
    })
}

function add_comment_HTML(id, uid, username, content, modifiedAt) {
    let comment_Html = `
                        <div id="comments" class="comments">
                            <div class="commentMeta">
                                <div class="commentTime">${modifiedAt}</div>
                                <div id="${id}-commentId" class="commentId">${username}</div>
                            </div>
                            <div class="commentContents">
                                <div id="${id}-commentContents" class="commentText">
                                    ${content}    
                                </div>
                                <div id="${id}-commentEditarea" class="commentEdit">
                                    <textarea id="${id}-commentTextarea" class="commentTe-edit" name="" cols="30" rows="5"></textarea>
                                </div>
                                <div class="commentFooter">
                                    <img id="${id}-commentEdit" onclick="commentEdit('${id}')" class="none commentIcon-start-edit" src="../images/edt.png"
                                         alt="">
                                    <img id="${id}-commentDelete" onclick="commentDelete('${id}', '${uid}')" class="none commentIcon-delete" src="../images/delete.png"
                                         alt="">
                                    <img id="${id}-commentSubmit" onclick="commentSubmitEdit('${id}', '${uid}')" class="none commentIcon-end-edit" src="../images/check.png"
                                         alt="">
                                    <img id="${id}-commentNoEdit" onclick="commentNoEdit('${id}')" class="none commentIcon-NoEdit" src="../images/modalout.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                     `;
    $('#commentBox').append(comment_Html);
}

function comment_loginUserOnly(id) {
    let loginUser = $('#header-title-login-user').text();
    let commentUser = $(`#${id}-commentId`).text();
    console.log(loginUser);
    console.log(commentUser);
    if(commentUser === loginUser) {
        $(`#${id}-commentEdit`).removeClass('none');
        $(`#${id}-commentDelete`).removeClass('none');
        $(`#${id}-commentSubmit`).removeClass('none');
    }
}

function commentEdit(id) {
    commentShowEdits(id);
    $(`#${id}-commentEdit`).addClass('none');
    let contents = $(`#${id}-commentContents`).text().trim();
    $(`#${id}-commentTextarea`).val(contents);

}

function commentShowEdits(id) {
    $(`#${id}-commentEditarea`).show();
    $(`#${id}-commentSubmit`).show();
    $(`#${id}-commentNoEdit`).show();

    $(`#${id}-commentDelete`).hide();
    $(`#${id}-commentContents`).hide();
    $(`#${id}-commentEdit`).hide();
}

function commentNoEdit(id) {
    $(`#${id}-commentEditarea`).hide();
    $(`#${id}-commentSubmit`).hide();
    $(`#${id}-commentNoEdit`).hide();

    $(`#${id}-commentDelete`).show();
    $(`#${id}-commentContents`).show();
    $(`#${id}-commentEdit`).show();
}

function commentSubmitEdit(id, uid) {
    // 1. 작성 대상 댓글의 username과 contents 를 확인합니다.
    let username = $(`#${id}-commentId`).text().trim();
    let contents = $(`#${id}-commentTextarea`).val().trim();
    contents = contents.replaceAll(/(\n|\r\n)/g, "<br>");
    // 2. 작성한 댓글이 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'uid': uid, 'username': username, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/comments/${id}`, // 백틱
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            console.log("수정완료");
            selectMyPost(uid);
        }
    });
}

function commentDelete(id, uid) {
    $.ajax({
        type: "DELETE",
        url: `/api/comments/${id}`,
        success: function (response) {
            selectMyPost(uid);
        }
    })
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
            console.log("수정완료");
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