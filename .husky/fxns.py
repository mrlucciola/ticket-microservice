from subprocess import check_output

def get_branch_name():
    return check_output(['git', 'symbolic-ref', '--short', 'HEAD']).strip().decode('utf-8')

def get_commit_ct():
    commit_ct_main = int(check_output(
        ['git', 'rev-list', '--count', 'HEAD']).strip().decode('utf-8'))
    commit_ct_head = int(check_output(
        ['git', 'rev-list', '--count', 'HEAD']).strip().decode('utf-8'))

    commit_ct_branch = commit_ct_main - commit_ct_head

    return {commit_ct_branch, commit_ct_main}