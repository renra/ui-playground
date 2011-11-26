require 'test_helper'

class AnimationsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get basic" do
    get :basic
    assert_response :success
  end

end
